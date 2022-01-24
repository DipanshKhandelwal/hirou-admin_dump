import React from 'react';
import { ICollectionPoint } from '../../../../models/collectionPoint';
import { UpdateConfirmationModal } from '../UpdateConfirmationModal';
import { useRef } from 'react';
import { Marker as Mapmarker } from 'google-maps-react';
import MarkerIcon from '../../../../assets/border.svg';

interface MarkerProps {
  marker: any;
  index: number;
  updateCollectionPointCoordinates: (
    cp: ICollectionPoint,
    newCoordinates: any
  ) => void;
}

export default function Marker(props: MarkerProps) {
  const { marker, index, updateCollectionPointCoordinates, google } = props;

  const cancelRef = useRef();

  const [location, setLocation] = React.useState(marker);
  const [isOpen, setIsOpen] = React.useState(false);

  const onUpdate = () => {
    try {
      updateCollectionPointCoordinates(marker.cp, {
        longitude: location.longitude,
        latitude: location.latitude,
      });
      setIsOpen(false);
    } catch (e) {}
  };

  const onCancel = () => {
    setLocation(marker);
    setIsOpen(false);
  };

  const handleCpDrag = (props: any, marker: any, e: any) => {
    setLocation({
      longitude: e.latLng.lng(),
      latitude: e.latLng.lat(),
    });
    setIsOpen(true);
  };

  if (!google) return null;

  return (
    <>
      <Mapmarker
        {...props}
        position={{ lat: location.latitude, lng: location.longitude }}
        draggable={true}
        title={String(index + 1)}
        name={String(index + 1)}
        label={String(index + 1)}
        onDragend={handleCpDrag}
        icon={{
          url: MarkerIcon,
          anchor: new google.maps.Point(10, 10),
          scaledSize: new google.maps.Size(20, 20),
        }}
      />
      <UpdateConfirmationModal
        cancelRef={cancelRef}
        onAccept={onUpdate}
        onCancel={onCancel}
        isOpen={isOpen}
      />
    </>
  );
}
