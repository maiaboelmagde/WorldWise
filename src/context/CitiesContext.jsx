import React, { createContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CitiesContext = createContext();

const CitiesAPI = 'http://localhost:8000/cities'
export default function CitiesProvider({ children }) {
  const [cities, setCities] = useState(null);
  const [currentCity, setCurrentCity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoading(true);
    fetch(CitiesAPI).then((response) => response.json()
    ).then((data) => {
      setCities(data);
      setLoading(false);
    }).catch((error) => {
      setError(error);
      setLoading(false);
    });
  }, []
  );

  async function createCity(newCity) {
    try {
      setLoading(true);
      const res = await fetch(CitiesAPI, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCity),
      });
      if (!res.ok) throw new Error("Failed to save the city");

      const data = await res.json();
      setCities((cities) => [...cities, data]);
      setCurrentCity(data);
      toast.success("City added!");

    } catch (err) {
      toast.error("There was an error adding the city");
    } finally {
      setLoading(false);
    }
  }

  async function deleteCity(id) {
    try {
      setLoading(true);
      const res = await fetch(`${CitiesAPI}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete the city");

      setCities((cities) => cities.filter((city) => city.id !== id));
      toast.success("City deleted!");
    } catch (err) {
      toast.error("There was an error deleting the city");
    }finally {
      setLoading(false);
    }
  }
  return (
    <CitiesContext.Provider value={{ cities, loading, error, currentCity, setCurrentCity, createCity, deleteCity }}>
      {children}
    </CitiesContext.Provider>
  )

}

export const useCities = () => {
  const context = React.useContext(CitiesContext);
  if (!context) {
    throw new Error("useCities must be used within a CitiesProvider");
  }
  return context;
}
