import React, { createContext, useState, useEffect } from 'react';

const CitiesContext = createContext();
export default function CitiesProvider({ children }) {
    const [cities, setCities] = useState(null);
    const [currentCity, setCurrentCity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:8000/cities').then((response) =>  response.json()
    ).then((data) => {
      setCities(data);
      setLoading(false);
    }).catch((error) => {
      setError(error);
      setLoading(false);
    });
  },[]
  );
  return (
    <CitiesContext.Provider value={{ cities, loading, error, currentCity, setCurrentCity }}>
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
