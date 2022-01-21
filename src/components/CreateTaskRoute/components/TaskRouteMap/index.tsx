import React, { useState, useEffect, useCallback } from 'react';
import { GOOGLE_MAPS_API_TOKEN } from '../../../../constants/mapbox';
import { Container } from '@chakra-ui/react';
import './styles.css';
import { useMemo } from 'react';
import { ITaskRoute } from '../../../../models/taskRoute';
import { ITaskCollectionPoint } from '../../../../models/taskCollectionPoint';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import MarkerIcon from '../../../../assets/border.svg';
interface TaskRouteMapProps {
  baseRoute: ITaskRoute | null;
  locationFocus: ITaskCollectionPoint | null;
  setLocationFocus: (task: ITaskCollectionPoint) => void;
}

const TaskRouteMap = (props: TaskRouteMapProps) => {
  const { baseRoute, locationFocus, setLocationFocus } = props;
  const [viewport, setViewport] = useState({
    latitude: 35.679467,
    longitude: 139.771008,
    zoom: 12,
  });

  const [markers, setMarkers] = useState<any>([]);
  const [google, setGoogle] = useState();

  useEffect(() => {
    if (locationFocus?.location) {
      const [lat, lng] = locationFocus.location.split(',');
      setViewport({
        latitude: Number(lat),
        longitude: Number(lng),
        zoom: 24,
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
        cp: cp,
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
    (marker: any) => {
      const { cp, task_collection } = marker;
      setLocationFocus({ ...cp, task_collection });
    },
    [setLocationFocus]
  );

  const markersView = useMemo(() => {
    if (!google) return null;
    return markers.map((marker: any, index: number) => (
      <Marker
        {...props}
        key={`marker-${index}`}
        position={{ lat: marker.latitude, lng: marker.longitude }}
        draggable={false}
        title={String(index + 1)}
        name={String(index + 1)}
        label={String(index + 1)}
        onClick={() => onFocusMaker(marker)}
        icon={{
          url: MarkerIcon,
          anchor: new google.maps.Point(10, 10),
          scaledSize: new google.maps.Size(20, 20),
        }}
      />
    ));
  }, [markers, google, props, onFocusMaker]);

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
      <Map
        google={google}
        initialCenter={{ lat: viewport.latitude, lng: viewport.longitude }}
        center={{ lat: viewport.latitude, lng: viewport.longitude }}
        zoom={viewport.zoom}
      >
        {markersView}
      </Map>
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
