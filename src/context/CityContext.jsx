import { createContext, useContext, useEffect, useReducer } from "react";

const API_URL = "http://localhost:3020";
const CityContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: ""
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload
      };
    case "cities/added":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "cities/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error("Unknown action type");
  }
}

function CityProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${API_URL}/cities`);
        const data = await res.json(); 
        dispatch({ type: "cities/loaded", payload: data });
      } catch  {
        dispatch({
          type: "rejected",
          payload: "There was an error loading cities. Please try again."
        });
      } 
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    if (Number(id) === currentCity.id) return;
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${API_URL}/cities/${id}`);
      const data = await res.json(); 
      dispatch({ type: "city/loaded", payload: data });
    } catch{
      dispatch({
        type: "rejected",
        payload: "There was an error loading the city. Please try again."
      });
    } 
  }

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${API_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        }
      });
      const data = await res.json(); 
      dispatch({ type: "cities/added", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error creating the city. Please try again."
      });
    } 
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${API_URL}/cities/${id}`, {
        method: "DELETE",
      }); 
      dispatch({ type: "cities/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting the city. Please try again."
      });
    } 
  }

  return (
    <CityContext.Provider value={{ cities, isLoading, currentCity, error, getCity, deleteCity, createCity }}>
      {children}
    </CityContext.Provider>
  );
}

function useCity() {
  const context = useContext(CityContext);
  if (context === undefined) {
    throw new Error("useCity must be used within a CityProvider");
  }
  return context;
}

export { CityProvider, useCity };