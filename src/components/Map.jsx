import { useState, useEffect } from 'react'
import styles from './Map.module.css';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from 'react-leaflet';
import Spinner from './Spinner';
import { useCities } from '../context/CitiesContext';
import toast from 'react-hot-toast';
import useURLPosition from '../hooks/useURLPosition';
import { useNavigate } from 'react-router-dom';

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

export default function Map() {

  const [position, setPosition] = useState(null);
  const [lat, lng] = useURLPosition();
  useEffect(() => {
    if (lat && lng) {
      setPosition([lat, lng]);
    }
  }, [lat, lng]);


  const { cities, loading, error } = useCities();

  function DetectClick(e) {
    const nav = useNavigate();
    useMapEvent('click', (e) => {
      setPosition([e.latlng.lat, e.latlng.lng]);
      console.log('Map clicked at:', e);
      nav(`/app/form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    });
    return null;
  }
  return (
    <div className={styles.mapContainer}>
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
      {error && toast.error("There was an error loading cities")}
      {loading && <Spinner />}
    </div>
  )
}
