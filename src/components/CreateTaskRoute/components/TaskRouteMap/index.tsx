import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import { Text, HStack, VStack, Container } from '@chakra-ui/react';
import { GOOGLE_MAPS_API_TOKEN } from '../../../../constants/mapbox';
import { ITaskRoute } from '../../../../models/taskRoute';
import { ITaskCollectionPoint } from '../../../../models/taskCollectionPoint';
import MarkerIcon from '../../../../assets/border.svg';
import TruckIcon from '../../../../assets/truck.svg';
import './styles.css';
import { getCookie } from '../../../../services/cookie';
import { ACCESS_TOKEN } from '../../../../constants/cookie';
import { SOCKET_URL } from '../../../../constants/urls';
import { SocketEventTypes, SocketSubEventTypes } from '../../../../constants/socket';
import { ITruckMarkers } from '../../../../models/markers';

interface TaskRouteMapProps {
  baseRoute: ITaskRoute | null;
  locationFocus: ITaskCollectionPoint | null;
  setLocationFocus: (task: ITaskCollectionPoint) => void;
}

const TaskRouteMap = (props: TaskRouteMapProps) => {
  const { baseRoute, locationFocus, setLocationFocus } = props;
  const [activeMarker, setActiveMarker] = useState(null);
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  const [viewport, setViewport] = useState({
    latitude: 35.679467,
    longitude: 139.771008,
    zoom: 12,
  });

  const [markers, setMarkers] = useState<any>([]);
  const [truckMarkers, setTruckMarkers] = useState<ITruckMarkers[]>([]);
  const [google, setGoogle] = useState();

  useEffect(() => {
    if (!baseRoute) return;
    const token = getCookie(ACCESS_TOKEN);
    const socketBaseUrl = `${SOCKET_URL}/subscribe/task-route/${baseRoute.id}/?token=${token}`;
    const websocket = new WebSocket(socketBaseUrl);

    websocket.onopen = () => {
      //
    };

    websocket.onmessage = (message) => {
      try {
        const socketData = JSON.parse(message.data);
        if (socketData?.event === SocketEventTypes.location) {
          if (socketData?.['sub-event'] === SocketSubEventTypes.update) {
            setTruckMarkers(socketData?.data);
          }
        }
      } catch (e) {
        //
      }
    };

    return () => {
      websocket?.close();
    };
  }, [baseRoute]);

  useEffect(() => {
    if (locationFocus?.location) {
      const [lat, lng] = locationFocus.location.split(',');
      setViewport({
        latitude: Number(lat),
        longitude: Number(lng),
        zoom: 16,
      });
    }
  }, [locationFocus]);

  useEffect(() => {
    if (!baseRoute) return;
    const _markers: any[] = [];

    const cps = baseRoute?.task_collection_point.sort(
      (a: ITaskCollectionPoint, b: ITaskCollectionPoint) => {
        return a.sequence - b.sequence;
      }
    );

    cps?.forEach((cp: ITaskCollectionPoint) => {
      const [lat, lng] = cp.location.split(',');
      const _marker = {
        longitude: Number(lng),
        latitude: Number(lat),
        cp,
      };
      _markers.push(_marker);
    });
    setMarkers(_markers);

    if (cps.length > 0) {
      const firstCp = cps[0];
      const [lat, lng] = firstCp.location.split(',');

      setViewport({
        latitude: Number(lat),
        longitude: Number(lng),
        zoom: 16,
      });
    }
  }, [baseRoute]);

  const onFocusMaker = useCallback(
    (marker: any, activeMarker) => {
      setActiveMarker(activeMarker);
      setShowingInfoWindow(true);
      const { cp, task_collection } = marker;
      setViewport((currentState) => ({ ...currentState, zoom: 15 }));
      setLocationFocus({ ...cp, task_collection });
    },
    [setLocationFocus]
  );

  const onInfoWindowClose = () => {
    setShowingInfoWindow(false);
    setActiveMarker(null);
  };

  const markersView = useMemo(() => {
    if (!google) return null;
    return markers.map((marker: any, index: number) => (
      <Marker
        {...props}
        key={`marker-${index}-${marker.cp.id}`}
        position={{ lat: marker.latitude, lng: marker.longitude }}
        draggable={false}
        title={String(index + 1)}
        name={String(index + 1)}
        label={String(index + 1)}
        onClick={(_, activeMarker) => onFocusMaker(marker, activeMarker)}
        icon={{
          url: MarkerIcon,
          anchor: new google.maps.Point(10, 10),
          scaledSize: new google.maps.Size(20, 20),
        }}
      >
        <div id={`marker-${marker.id}`} />
      </Marker>
    ));
  }, [markers, google, onFocusMaker]);

  const truckMarkersView = useMemo(() => {
    if (!google) return null;
    return truckMarkers.map((marker: ITruckMarkers, index: number) => {
      const [lat, lng] = marker?.location?.split(',');
      return (
        <Marker
          {...props}
          key={`truck-marker-${index}-${marker.id}`}
          position={{ lat, lng }}
          draggable={false}
          label={{ text: `${marker.name}`, fontWeight: 'bold', color: 'red' }}
          icon={{
            url: TruckIcon,
            scaledSize: new google.maps.Size(30, 30),
            labelOrigin: new google.maps.Point(12, -8),
          }}
        >
          <div id={`truck-marker-${marker.id}`} />
        </Marker>
      );
    });
  }, [truckMarkers, google]);

  const infoWindowView = useMemo(() => {
    return (
      <InfoWindow
        visible={showingInfoWindow}
        marker={activeMarker}
        onClose={onInfoWindowClose}
      >
        <VStack
          align='stretch'
          p={1}
          paddingX={0}
          flex={1}
          alignItems={'center'}
        >
          <HStack minWidth={100}>
            <Text color='black' fontWeight='bold' flexGrow={0} fontSize={16}>
              # {locationFocus?.sequence}
            </Text>
            <Text flexGrow={0} color='black' fontWeight='bold' fontSize={16}>
              |
            </Text>
            <Text
              color='black'
              fontWeight='bold'
              flexGrow={1}
              textAlign='center'
            >
              {locationFocus?.name}{' '}
            </Text>
          </HStack>
        </VStack>
      </InfoWindow>
    );
  }, [showingInfoWindow, activeMarker, locationFocus]);

  return (
    <Container
      position='relative'
      height='100%'
      width='100%'
      maxW='unset'
      m={0}
      p={0}
    >
      <GoogleProvider onChange={(google: any) => setGoogle(google)} />
      {google && (
        <Map
          google={google}
          initialCenter={{ lat: viewport.latitude, lng: viewport.longitude }}
          center={{ lat: viewport.latitude, lng: viewport.longitude }}
          zoom={viewport.zoom}
          onClick={onInfoWindowClose}
        >
          {markersView}
          {truckMarkersView}
          {infoWindowView}
        </Map>
      )}
    </Container>
  );
};

function Wrapper(props: any) {
  useEffect(() => {
    props.onChange(props.google);
  }, [props]);
  return null;
}

const GoogleProvider = GoogleApiWrapper({
  apiKey: GOOGLE_MAPS_API_TOKEN,
  language: 'ja',
  region: 'JP',
})(Wrapper);

export default TaskRouteMap;
