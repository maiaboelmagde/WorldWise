import { createContext, useContext, useEffect, useReducer, useCallback } from "react";
import toast from "react-hot-toast";

const CitiesContext = createContext();
const CitiesAPI = "http://localhost:8000/cities";

const initialState = {
  cities: [],
  currentCity: null,
  loading: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, loading: true, error: null };
    case "cities/loaded":
      return { ...state, loading: false, cities: action.payload };
    case "city/created":
      return {
        ...state,
        loading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        loading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity:
          state.currentCity?.id === action.payload ? null : state.currentCity,
      };
    case "city/current":
      return { ...state, currentCity: action.payload };
    case "error":
      return { ...state, loading: false, error: action.payload };
    default:
      throw new Error("Unknown action type: " + action.type);
  }
}

export default function CitiesProvider({ children }) {
  const [{ cities, currentCity, loading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(CitiesAPI);
        if (!res.ok) throw new Error("Failed to load cities");
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        dispatch({ type: "error", payload: "Failed to load cities"});
      }
    }
    fetchCities();
  }, []);

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(CitiesAPI, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCity),
      });
      if (!res.ok) throw new Error("Failed to save the city");
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
      toast.success("City added!");
    } catch (err) {
      dispatch({ type: "error", payload: err.message });
      toast.error("There was an error adding the city");
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${CitiesAPI}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete the city");
      dispatch({ type: "city/deleted", payload: id });
      toast.success("City deleted!");
    } catch (err) {
      dispatch({ type: "error", payload: err.message });
      toast.error("There was an error deleting the city");
    }
  }

  const setCurrentCity = useCallback((city) => {
    dispatch({ type: "city/current", payload: city });
  }, []);

  return (
    <CitiesContext.Provider
      value={{ cities, loading, error, currentCity, setCurrentCity, createCity, deleteCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export function useCities() {
  const context = useContext(CitiesContext);
  if (!context) throw new Error("useCities must be used within a CitiesProvider");
  return context;
}
