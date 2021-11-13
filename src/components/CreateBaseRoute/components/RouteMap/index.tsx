import React, { useState, useEffect } from 'react';
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
import { useMemo } from 'react';
import CustomMarker from '../Marker'
interface RouteMapProps {
  baseRoute: IBaseRoute
  tempMarker: any
  setTempMarker: (state: any) => void
  setAddCPModalOpen: (state: boolean) => void
  updateCollectionPointCoordinates: (cp: ICollectionPoint, newCoordinates: any) => void
}

const RouteMap = (props: RouteMapProps) => {
  const { baseRoute, tempMarker, setAddCPModalOpen, setTempMarker, updateCollectionPointCoordinates } = props;
  const [viewport, setViewport] = useState({
    latitude: 35.6794670,
    longitude: 139.771008,
    zoom: 12
  });

  const [markers, setMarkers] = useState<any>([])

  useEffect(() => {
    if (!baseRoute) return;
    const _markers: any[] = []

    const cps = baseRoute?.collection_point.sort((a: ICollectionPoint, b: ICollectionPoint) => {
      return a.sequence - b.sequence
    })

    cps?.forEach((cp: ICollectionPoint) => {
      const [lat, lng] = cp.location.split(',')
      const _marker = {
        longitude: Number(lng),
        latitude: Number(lat),
        cp: cp
      }
      _markers.push(_marker)
    });
    setMarkers(_markers)

    if (cps.length > 0) {
      const firstCp = cps[0]
      const [lat, lng] = firstCp.location.split(',')

      setViewport({
        latitude: Number(lat),
        longitude: Number(lng),
        zoom: 12
      })
    }

  }, [baseRoute])

  const add = (e: any) => {
    e.stopPropagation()
    setAddCPModalOpen(true)
  }

  const markersView = useMemo(() => {
    return (
      markers.map((marker: any, index: number) => (
        <CustomMarker
          updateCollectionPointCoordinates={updateCollectionPointCoordinates}
          key={`marker-${index}`}
          index={index}
          marker={marker}
        />
      ))
    )
  }, [markers, updateCollectionPointCoordinates])

  const tempMarkerUpdate = (evt: any) => {
    const [lng, lat] = evt.lngLat
    setTempMarker({
      longitude: lng,
      latitude: lat
    })
  }

  return (
    <Container position='relative' height='100%' width='100%' maxW='unset' m={0} p={0}  >
      <ReactMapGL
        height='100%' width='100%'
        mapStyle={MAPBOX_STYLE}
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        {...viewport}
        onViewportChange={(nextViewport: any) => setViewport(nextViewport)}
        onClick={tempMarkerUpdate}
      >
        {markersView}
        {tempMarker &&
          <Marker
            onDragEnd={tempMarkerUpdate}
            longitude={tempMarker.longitude}
            latitude={tempMarker.latitude}
            draggable={true}
          >
            <div className="marker temporary-marker"><span></span></div>
          </Marker>}
      </ReactMapGL>
      <Box position='absolute' p={2} top={0} left={0} backgroundColor='#5050505c' >
        <VStack>
          <Button onClick={add} disabled={!tempMarker} >
            追加
          </Button>
        </VStack>
      </Box>
    </Container>
  )
}

export default RouteMap;
