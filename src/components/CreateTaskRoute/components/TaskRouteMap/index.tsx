import React, { useState, useEffect } from 'react';
import { MAPBOX_ACCESS_TOKEN, MAPBOX_STYLE } from '../../../../constants/mapbox';
import { Container } from "@chakra-ui/react"
import './styles.css'
import ReactMapGL from 'react-map-gl';
import { useMemo } from 'react';
import CustomMarker from '../Marker'
import { ITaskRoute } from '../../../../models/taskRoute';
import { ITaskCollectionPoint } from '../../../../models/taskCollectionPoint';

interface TaskRouteMapProps {
  baseRoute: ITaskRoute | null
}

const TaskRouteMap = (props: TaskRouteMapProps) => {
  const { baseRoute } = props;
  const [viewport, setViewport] = useState({
    latitude: 35.6794670,
    longitude: 139.771008,
    zoom: 12
  });

  const [markers, setMarkers] = useState<any>([])

  useEffect(() => {
    if (!baseRoute) return;
    const _markers: any[] = []

    const cps = baseRoute?.task_collection_point.sort((a: ITaskCollectionPoint, b: ITaskCollectionPoint) => {
      return a.sequence - b.sequence
    })

    cps?.forEach((cp: ITaskCollectionPoint) => {
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
        zoom: 16
      })
    }
  }, [baseRoute])

  const markersView = useMemo(() => {
    return (
      markers.map((marker: any, index: number) => (
        <CustomMarker
          key={`marker-${index}`}
          index={index}
          marker={marker}
        />
      ))
    )
  }, [markers])

  return (
    <Container position='relative' height='100%' width='100%' maxW='unset' m={0} p={0}  >
      <ReactMapGL
        height='100%' width='100%'
        mapStyle={MAPBOX_STYLE}
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        {...viewport}
        onViewportChange={(nextViewport: any) => setViewport(nextViewport)}
      >
        {markersView}
      </ReactMapGL>
    </Container>
  )
}

export default TaskRouteMap;
