import React, { useState, useEffect, useMemo } from 'react';
import { GOOGLE_MAPS_API_TOKEN } from '../../../../constants/mapbox';
import { Container, VStack, Button, Box } from '@chakra-ui/react';
import './styles.css';
import { IBaseRoute } from '../../../../models/baseRoute';
import { ICollectionPoint } from '../../../../models/collectionPoint';
import CustomMarker from '../Marker';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import NewMarkerIcon from '../../../../assets/border-new.svg';

interface RouteMapProps {
  baseRoute: IBaseRoute;
  tempMarker: any;
  setTempMarker: (state: any) => void;
  setAddCPModalOpen: (state: boolean) => void;
  updateCollectionPointCoordinates: (
    cp: ICollectionPoint,
    newCoordinates: any
  ) => void;
}

const RouteMap = (props: RouteMapProps) => {
  const {
    baseRoute,
    tempMarker,
    setAddCPModalOpen,
    setTempMarker,
    updateCollectionPointCoordinates,
  } = props;
  const [viewport, setViewport] = useState({
    latitude: 35.679467,
    longitude: 139.771008,
    zoom: 12,
  });

  const [markers, setMarkers] = useState<any>([]);
  const [google, setGoogle] = useState();

  useEffect(() => {
    if (!baseRoute) return;
    const _markers: any[] = [];

    const cps = baseRoute?.collection_point.sort(
      (a: ICollectionPoint, b: ICollectionPoint) => {
        return a.sequence - b.sequence;
      }
    );

    cps?.forEach((cp: ICollectionPoint) => {
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
        zoom: 12,
      });
    }
  }, [baseRoute]);

  const add = (e: any) => {
    e.stopPropagation();
    setAddCPModalOpen(true);
  };

  const markersView = useMemo(() => {
    return markers.map((marker: any, index: number) => (
      <CustomMarker
        updateCollectionPointCoordinates={updateCollectionPointCoordinates}
        key={`marker-${index}`}
        index={index}
        marker={marker}
      />
    ));
  }, [markers, updateCollectionPointCoordinates]);

  const tempMarkerUpdate = (props: any, marker: any, e: any) => {
    setTempMarker({
      longitude: e.latLng.lng(),
      latitude: e.latLng.lat(),
    });
  };

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
        onClick={tempMarkerUpdate}
        google={google}
        initialCenter={{ lat: viewport.latitude, lng: viewport.longitude }}
        center={{ lat: viewport.latitude, lng: viewport.longitude }}
        zoom={viewport.zoom}
      >
        {markersView}
        {tempMarker && google && (
          <Marker
            {...props}
            position={{ lat: tempMarker.latitude, lng: tempMarker.longitude }}
            onDragend={tempMarkerUpdate}
            draggable={true}
            title='New'
            name='New'
            label='N'
            icon={{
              url: NewMarkerIcon,
              anchor: new google.maps.Point(10, 10),
              scaledSize: new google.maps.Size(20, 20),
            }}
          />
        )}
      </Map>
      <Box
        position='absolute'
        p={2}
        top={0}
        left={0}
        backgroundColor='#5050505c'
      >
        <VStack>
          <Button onClick={add} disabled={!tempMarker}>
            追加
          </Button>
        </VStack>
      </Box>
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

export default RouteMap;
