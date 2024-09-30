import { createContext, useContext, useEffect, useState } from "react";

const ARRAY_URL = "http://localhost:3020";
const CityContext = createContext()

function CityProvider({ children }){
  const [cities, setCities] = useState([]); 
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity,setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${ARRAY_URL}/cities`);
        const data = await res.json(); 
        setCities(data);
        console.log(data)
      } catch {
        alert("There was an error loading data...please try again");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  },[] );

  async function getCity(id){
    try {
        setIsLoading(true);
        const res = await fetch(`${ARRAY_URL}/cities/${id}`);
        const data = await res.json(); 
        setCurrentCity(data);
        console.log(data)
      } catch {
        alert("There was an error loading data...please try again");
      } finally {
        setIsLoading(false);
      }

    }
  return (
    <CityContext.Provider value={{cities, isLoading,currentCity,getCity }}>
    {children}
  </CityContext.Provider>
  )

}

 function useCity(){
    const context = useContext(CityContext);
    if (context === undefined) throw new Error("city context was used outside citiesProvider")
    return context;
  }

export  {CityProvider,useCity};