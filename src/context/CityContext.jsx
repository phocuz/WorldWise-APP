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

    async function createCity(newCity){
    try {
        setIsLoading(true);
        const res = await fetch(`${ARRAY_URL}/cities`,{
          method: "POST",
          body: JSON.stringify(newCity),
          headers: {
            "content-Type": "application/json",
          }
        });
        const data = await res.json(); 
        setCities(cities => [...cities,data])
      } catch {
        alert("There was an error loading data...please try again");
      } finally {
        setIsLoading(false);
      }

    }


    function deleteCity(id) {
    setCities((prevCities) => {
      const updatedCities = prevCities.filter(city => city.id !== id);
      
      // If the deleted city was the current city, update currentCity
      if (currentCity && currentCity.id === id) {
        setCurrentCity(updatedCities.length > 0 ? updatedCities[0] : null);
      }
      
      return updatedCities;
    });
  }
  return (
    <CityContext.Provider value={{cities, isLoading,currentCity,getCity,deleteCity,createCity }}>
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