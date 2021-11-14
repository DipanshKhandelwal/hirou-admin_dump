import React from 'react'
import { Marker as Mapmarker } from 'react-map-gl';

interface MarkerProps {
  marker: any
  index: number
}

export default function Marker(props: MarkerProps) {
  const { marker, index } = props

  return (
    <Mapmarker
      longitude={marker.longitude}
      latitude={marker.latitude}
      draggable={false}
    >
      <div className="marker">
        <span><b>{index + 1}</b></span>
      </div>
    </Mapmarker>
  );
}