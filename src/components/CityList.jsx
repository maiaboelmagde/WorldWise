import {useState } from 'react';
import Spinner from './Spinner';
import CityItem from './CityItem';
import { useCities } from '../context/CitiesContext';
import styles from './CityList.module.css';

export default function CityList() {
  const { cities, loading, error } = useCities(); // useCities is a custom hook that fetches the cities from the API
  const [selectedCity, setSelectedCity] = useState(null); // state to store the selected city
  return (
    <div className={styles.cityList}>
        {loading && <Spinner/>}
        {error && <p>Error: {error.message}</p>}
        {!loading && !error && cities && cities.length > 0 && (
          <ul className={styles.cityList}>
            {cities.map((city) => (
              <CityItem key={city.id} city={city} />
            ))}
          </ul>
        )}
        {!loading && !error && (!cities || cities.length === 0) && (
          <p>Add your first city by clicking on a city on the map</p>
        )}
    </div>
  )
}
