import styles from './CountryList.module.css';
import { useCities } from '../context/CitiesContext';
import Spinner from './Spinner';
import CountryItem from './CountryItem';
import {v4 as uuidv4} from 'uuid';


export default function CountryList() {
    const { cities, loading, error } = useCities();
    const uniqueCountries = cities
  ? Array.from(
      new Map(
        cities.map(city => [
          city.country,
          {
            country: city.country,
            emoji: city.emoji,
            position: city.position
          }
        ])
      ).values()
    )
  : [];

  return (
    <div className={styles.countryList}>
        {loading && <Spinner />}
        {error && <p className={styles.error}>{error}</p>}
        {!loading && !error && uniqueCountries && uniqueCountries.length > 0 && (
          <ul className={styles.countryList}>
            {uniqueCountries.map((country) => (
              <CountryItem key={uuidv4()} country={country} />
            ))}
          </ul>
        )}
        {!loading && !error && (!uniqueCountries || uniqueCountries.length === 0) && (
          <p>No countries available</p>
        )}
    </div>
  )
}
