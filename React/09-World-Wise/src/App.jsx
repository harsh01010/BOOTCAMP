import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import { useEffect, useState } from "react";
import City from "./components/City";
import Form from "./components/Form";

function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchCities() {
      try {
        const res = await fetch("http://localhost:3000/cities");
        const data = await res.json();
        setCities(data);
      } catch {
        alert("some error occured , while fetching data");
      }
      setIsLoading(false);
    }
    fetchCities();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route /*path="/" */ index element={<HomePage />} />
        <Route path="product" element={<Product />} />
        <Route path="Pricing" element={<Pricing />} />
        <Route path="app" element={<AppLayout />}>
          <Route index element={<CityList />} />
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route path="cities/:id" element={<City />} />
          <Route
            path="countries"
            element={<CountryList cities={cities} isLoading={isLoading} />}
          />
          <Route path="form" element={<Form />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

/*
The URL for state management

the url is an excellent place to store UI state and an alternative to useState in some situations!

easy way to store state in a global place, accessible to all components in the app
good way to pass data from one page into the next page
makes it possible to bookmark and share the page with the exact ui state it had at the time


react router tools:
  params and querystrings
*/
