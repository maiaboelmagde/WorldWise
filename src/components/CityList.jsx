import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import CityItem from './CityItem';
import { useCities } from '../context/CitiesContext';
import styles from './CityList.module.css';

export default function CityList() {
  const { cities, loading, error,currentCity, setCurrentCity } = useCities(); // useCities is a custom hook that fetches the cities from the API
  const nav = useNavigate();

  const navigateToCity = (city) => {
    console.log('navigateToCity called with city:', city);
    setCurrentCity(city);
    nav(`/app/cities/${city.id}?${new URLSearchParams({ lat: city.position.lat, lng: city.position.lng }).toString()}`);
  }
  return (
    <div className={styles.cityList}>
      {loading && <Spinner />}
      {error && <p>Error: {error.message}</p>}
      {!loading && !error && cities && cities.length > 0 && (
        <ul className={styles.cityList}>
          {cities.map((city) => (
            <CityItem key={city.id} city={city} selected={currentCity?.id === city.id} onClick={navigateToCity} />
          ))}
        </ul>
      )}
      {!loading && !error && (!cities || cities.length === 0) && (
        <p>Add your first city by clicking on a city on the map</p>
      )}
    </div>
  )
}
