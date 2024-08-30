import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import AppLayout from "./components/AppLayout";
import CityList from "./components/CityList";
import { useState, useEffect } from "react";

const ARRAY_URL = "http://localhost:3020";

function App() {
  const [cities, setCities] = useState([]); 
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route index element={<CityList cities={cities} isLoading={isLoading} />} />
          <Route path="cities" element={<CityList cities={cities} isLoading={isLoading} />} />
          <Route path="countries" element={<p>country</p>} />
          <Route path="form" element={<p>this is a form</p>} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
