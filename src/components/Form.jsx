import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import useURLPosition from "../hooks/useURLPosition";
import Button, { ButtonBack } from "./Button";
import Spinner from "./Spinner";
import { useCities } from "../context/CitiesContext";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function setURLToGetCityName({ lat, lng }) {
  const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`;
  return url;
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [lat, lng] = useURLPosition();
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [geocodingError, setGeocodingError] = useState("");

  const navigate = useNavigate();
  const {createCity} = useCities();

  useEffect(() => {
    if (!lat && !lng) return;
    setIsLoadingGeocoding(true);
    setGeocodingError("");
    fetch(setURLToGetCityName({ lat, lng }))
      .then((res) => res.json())
      .then((data) => {
        setCityName(data.city);
        if (!data.countryCode)
          throw new Error(
            "That doesn't seem to be a city. Click somewhere else 😉"
          );
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      })
      .catch((err) => {
        setGeocodingError(`Failed to fetch city name, ${err.message}`);
      }).finally(() => {
        setIsLoadingGeocoding(false);
      });
  }, [lat, lng]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat: Number(lat), lng: Number(lng) },
    };
    await createCity(newCity);
    navigate("/app/cities");
  }

  return (
    geocodingError ? (
      <p>{geocodingError}</p>
    ) : isLoadingGeocoding ? (<Spinner />) : (
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="cityName">City name</label>
          <input
            id="cityName"
            onChange={(e) => setCityName(e.target.value)}
            value={cityName}
          />
          <span className={styles.flag}>{emoji}</span>
        </div>

        <div className={styles.row}>
          <label htmlFor="date">When did you go to {cityName}?</label>
          <input
            id="date"
            onChange={(e) => setDate(e.target.value)}
            value={date}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="notes">Notes about your trip to {cityName}</label>
          <textarea
            id="notes"
            onChange={(e) => setNotes(e.target.value)}
            value={notes}
          />
        </div>

        <div className={styles.buttons}>
          <Button type="primary" onClick={handleSubmit} >Add</Button>
          <ButtonBack />
        </div>
      </form>
    )
  );
}

export default Form;
