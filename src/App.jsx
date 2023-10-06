import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Homepage } from "./pages/Homepage";

import { Pricing } from "./pages/Pricing";
import { ErrorPage } from "./pages/ErrorPage";
import { Applayout } from "./pages/Applayout";
import { Login } from "./pages/Login";
import { Product } from "./pages/Product";
import { City } from "./components/City";
import { CityList } from "./components/CityList";
import { CountryList } from "./components/CountryList";
import { useEffect, useState } from "react";
import Spinner from "./components/Spinner";
const BASE_URL = "http://localhost:9000/cities";
function App() {
  const [allMyCities, setCities] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAllCities = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(BASE_URL);
        const data = await response.json();
        setCities(data);
      } catch (err) {
        console.log("error found");
      } finally {
        setIsLoading(false);
      }
    };

    getAllCities();
  }, []);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/Product" element={<Product />} />
          <Route path="/Pricing" element={<Pricing />} />
          <Route path="/App" element={<Applayout />}>
            <Route
              index
              element={<CityList allCities={allMyCities} loading={isloading} />}
            />
            <Route
              path="cities"
              element={<CityList allCities={allMyCities} loading={isloading} />}
            />
            <Route path="cities/:id" element={<City />} />
            <Route
              path="countries"
              element={
                <CountryList allCities={allMyCities} loading={isloading} />
              }
            />

            {/* <Route path="form" element={<p>Form</p>} /> */}
          </Route>
          <Route path="/Login" element={<Login />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
