import { useState, useEffect } from 'react'
import styles from './Map.module.css';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from 'react-leaflet';
import Spinner from './Spinner';
import { useCities } from '../context/CitiesContext';
import useURLPosition from '../hooks/useURLPosition';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { useGeolocation } from '../hooks/useGeoLocation';
import User from './User';
import toast from 'react-hot-toast';

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick(e) {
  const nav = useNavigate();
  useMapEvent('click', (e) => {
    nav(`/app/form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
  });
  return null;
}

export default function Map() {

  const [lat, lng] = useURLPosition();
  const { cities, loading, error } = useCities();
  const { getPosition, error: geoError, loading: geoLoading } = useGeolocation();
  const nav = useNavigate();

  const position = lat && lng ? [Number(lat), Number(lng)] : null;

  useEffect(() => {
    if (error) toast.error("There was an error loading cities", { id: "cities-error" });
  }, [error]);

  useEffect(() => {
    if (geoError) toast.error("Couldn't get your location", { id: "geo-error" });
  }, [geoError]);

  function detectGeoLocation() {
    getPosition((pos) => {
      nav(`/app/form?lat=${pos.lat}&lng=${pos.lng}`);
    });
  }

  return (
    <div className={styles.mapContainer}>
      <Button onClick={detectGeoLocation} type="primary" floated>
        {geoLoading ? "Locating..." : "Go to GeoLocation"}
      </Button>
      <User/>
      <MapContainer center={position ?? [50, 80]} zoom={5} scrollWheelZoom={false} className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities && cities.map((city) => (
          <Marker key={city.id} position={[city.position.lat, city.position.lng]}>
            <Popup>
              <span>{city.cityName} {city.emoji}</span>
            </Popup>
          </Marker>
        ))}
        {position && <ChangeCenter position={position} />}
        <DetectClick />
      </MapContainer>
      {loading && <Spinner />}
    </div>
  )
}
