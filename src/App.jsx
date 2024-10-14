import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import { CityProvider } from "./context/CityContext";
import { AuthProvider } from "./context/FakeAuthContext";

import CityList from "./components/CityList";
import City from "./components/City";
import Form from "./components/Form";
import CountryList from "./components/CountryList";
import SpinnerFullPage from "./components/SpinnerFullPage";


// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import Homepage from "./pages/Homepage";
// import PageNotFound from "./pages/PageNotFound";
// import Login from "./pages/Login";
// import AppLayout from "./components/AppLayout";

const Homepage = lazy(()=>import("./pages/Homepage"));
const Pricing = lazy(()=>import("./pages/Pricing"));
const Product = lazy(()=>import("./pages/Product"));
const PageNotFound = lazy(()=>import("./pages/PageNotFound"));
const Login = lazy(()=>import("./pages/Login"));
const AppLayout = lazy(()=>import("./components/AppLayout"));

// dist/assets/index-CSqet2Wb.css   30.06 kB │ gzip:   5.01 kB
// dist/assets/index-BnHbB0f-.js   505.65 kB │ gzip: 147.64 kB


function App() {
 
  return (
   <AuthProvider>
     <CityProvider>
      <BrowserRouter>
      
      <Suspense fallback={<SpinnerFullPage />}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route index element={<CityList  />} />
          <Route path="cities" element={<CityList  />} />
          <Route path="cities/:id" element={<City />} />
          <Route path="countries" element={<CountryList />} />
          <Route path="form" element={<Form />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      </Suspense>
    </BrowserRouter>
    </CityProvider>
   </AuthProvider>
  );
}

export default App;
