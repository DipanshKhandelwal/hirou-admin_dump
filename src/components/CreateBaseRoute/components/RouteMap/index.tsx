import React, { useRef, useState, useEffect } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line
import { MAPBOX_ACCESS_TOKEN } from '../../../../constants/mapbox';
import {
  Container,
} from "@chakra-ui/react"
import './styles.css'

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

const RouteMap = () => {
  const mapContainer = useRef(null);
  const map: any = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });
  }, [map, lng, lat, zoom]);

  useEffect(() => {
    if (!map.current) return;
    map.current?.on('move', () => {
      setLng(map.current?.getCenter().lng.toFixed(4));
      setLat(map.current?.getCenter().lat.toFixed(4));
      setZoom(map.current?.getZoom().toFixed(2));
    });
  }, [map, lat, lng]);

  return (
    <Container height='100%' width='100%' maxW='unset' m={0} p={0} ref={mapContainer} className="map-container" />
  )

}

export default RouteMap;
