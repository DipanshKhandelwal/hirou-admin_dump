import React, { useRef, useState, useEffect } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line
import { MAPBOX_ACCESS_TOKEN } from '../../../../constants/mapbox';
import {
  Container,
} from "@chakra-ui/react"
import './styles.css'
import { IBaseRoute } from '../../../../models/baseRoute';
import { ICollectionPoint } from '../../../../models/collectionPoint';

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
interface RouteMapProps {
  baseRoute: IBaseRoute
}

const RouteMap = (props: RouteMapProps) => {
  const mapContainer = useRef(null);
  const map: any = useRef(null);
  const [lng, setLng] = useState(139.668215);
  const [lat, setLat] = useState(35.850778);
  const [zoom, setZoom] = useState(9);

  const { baseRoute } = props;

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
    if (!baseRoute) return;

    map.current?.on('move', () => {
      setLng(map.current?.getCenter().lng.toFixed(4));
      setLat(map.current?.getCenter().lat.toFixed(4));
      setZoom(map.current?.getZoom().toFixed(2));
    });

    map.current.on('click', (e: any) => {
      console.log("click e", e)
    });
  }, [map, lat, lng, baseRoute]);

  useEffect(() => {
    if (!map.current) return;
    if (!baseRoute) return;

    baseRoute?.collection_point.forEach((cp: ICollectionPoint) => {
      var el = document.createElement('div');
      el.id = `marker${cp.id}`;

      var popup = new mapboxgl.Popup({ offset: 25 }).setText(
        'Construction on the Washington Monument began in 1848.'
      );

      const loc = cp.location.split(',')

      new mapboxgl.Marker(el)
        .setLngLat(loc)
        .setPopup(popup) // sets a popup on this marker
        .addTo(map.current);
    });
  }, [baseRoute, map])

  return (
    <Container height='100%' width='100%' maxW='unset' m={0} p={0} ref={mapContainer} className="map-container" />
  )
}

export default RouteMap;
