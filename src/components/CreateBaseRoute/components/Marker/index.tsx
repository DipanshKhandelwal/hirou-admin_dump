import React from 'react'
import { ICollectionPoint } from '../../../../models/collectionPoint';
import { Marker as Mapmarker } from 'react-map-gl';
import { UpdateConfirmationModal } from '../UpdateConfirmationModal';
import { useRef } from 'react';

interface MarkerProps {
  marker: any
  index: number
  updateCollectionPointCoordinates: (cp: ICollectionPoint, newCoordinates: any) => void
}

export default function Marker(props: MarkerProps) {
  const { marker, index, updateCollectionPointCoordinates } = props

  const cancelRef = useRef()

  const [location, setLocation] = React.useState(marker)
  const [isOpen, setIsOpen] = React.useState(false)

  const onUpdate = () => {
    try {
      updateCollectionPointCoordinates(marker.cp, {
        longitude: location.longitude,
        latitude: location.latitude
      })
      setIsOpen(false);
    }
    catch (e) { }
  }

  const onCancel = () => {
    setLocation(marker);
    setIsOpen(false);
  }

  const handleCpDrag = (evt: any) => {
    const [lng, lat] = evt.lngLat
    setLocation({
      longitude: lng,
      latitude: lat
    })
    setIsOpen(true)
  }

  return (
    <Mapmarker
      longitude={location.longitude}
      latitude={location.latitude}
      draggable={true}
      onDragEnd={handleCpDrag}
    >
      <div className="marker">
        <span><b>{index + 1}</b></span>
      </div>
      <UpdateConfirmationModal cancelRef={cancelRef} onAccept={onUpdate} onCancel={onCancel} isOpen={isOpen} />
    </Mapmarker>
  );
}