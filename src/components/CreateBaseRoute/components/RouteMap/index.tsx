import React, { useState, useEffect } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line
import { MAPBOX_ACCESS_TOKEN, MAPBOX_STYLE } from '../../../../constants/mapbox';
import {
  Container,
  VStack,
  Button,
  Box
} from "@chakra-ui/react"
import './styles.css'
import { IBaseRoute } from '../../../../models/baseRoute';
import { ICollectionPoint } from '../../../../models/collectionPoint';
import ReactMapGL, { Marker } from 'react-map-gl';
import { AddCollectionPointModal } from '../AddCollectionPointModal'
interface RouteMapProps {
  baseRoute: IBaseRoute
}

const RouteMap = (props: RouteMapProps) => {
  const { baseRoute } = props;
  const [viewport, setViewport] = useState({
    latitude: 35.6794670,
    longitude: 139.771008,
    zoom: 12
  });

  const [markers, setMarkers] = useState<any>([])
  const [tempMarker, setTempMarker] = useState<any>(null)

  const [isAddCPModalOpen, setAddCPModalOpen] = useState(false)

  const onModalClose = () => {
    setAddCPModalOpen(false)
    setAddCPModalOpen(false)
    setTempMarker(null)
  }

  useEffect(() => {
    if (!baseRoute) return;
    const _markers: any[] = []

    baseRoute?.collection_point?.forEach((cp: ICollectionPoint) => {
      const [lat, lng] = cp.location.split(',')
      const _marker = {
        longitude: Number(lng),
        latitude: Number(lat)
      }
      _markers.push(_marker)
    });
    setMarkers(_markers)
  }, [baseRoute])

  const add = (e: any) => {
    e.stopPropagation()
    setAddCPModalOpen(true)
  }

  const CustomMarker = ({ index, marker }: { index: any, marker: any }) => {
    return (
      <Marker
        longitude={marker.longitude}
        latitude={marker.latitude}>
        <div className="marker">
          <span><b>{index + 1}</b></span>
        </div>
      </Marker>
    )
  };

  return (
    <Container position='relative' height='100%' width='100%' maxW='unset' m={0} p={0}  >
      <ReactMapGL
        height='100%' width='100%'
        mapStyle={MAPBOX_STYLE}
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        {...viewport}
        onViewportChange={(nextViewport: any) => setViewport(nextViewport)}
        onClick={(e: any) => {
          const [lng, lat] = e.lngLat
          setTempMarker({
            longitude: lng,
            latitude: lat
          })
        }}
      >
        {markers.map((marker: any, index: number) => (
          <CustomMarker
            key={`marker-${index}`}
            index={index}
            marker={marker}
          />
        ))}
        {tempMarker &&
          <Marker
            longitude={tempMarker.longitude}
            latitude={tempMarker.latitude}>
            <div className="marker temporary-marker"><span></span></div>
          </Marker>}
      </ReactMapGL>
      <Box position='absolute' p={2} top={0} left={0} backgroundColor='#5050505c' >
        <VStack>
          <Button onClick={add} disabled={!tempMarker} >
            Add
          </Button>
        </VStack>
      </Box>
      <AddCollectionPointModal marker={tempMarker} baseRoute={baseRoute} isOpen={isAddCPModalOpen} onClose={onModalClose} />
    </Container>
  )
}

export default RouteMap;
