import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Homepage } from "./pages/Homepage";

import { Pricing } from "./pages/Pricing";
import { ErrorPage } from "./pages/ErrorPage";
import { Applayout } from "./pages/Applayout";
import { Login } from "./pages/Login";
import { Product } from "./pages/Product";
// import { Map } from "./components/Map";
import { CityList } from "./components/CityList";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/Product" element={<Product />} />
          <Route path="/Pricing" element={<Pricing />} />
          <Route path="/App" element={<Applayout />}>
            <Route index element={<CityList />} />
            <Route path="cities" element={<CityList />} />
            <Route path="countries" element={<p>List of countries</p>} />
            <Route path="form" element={<p>Form</p>} />
          </Route>
          <Route path="/Login" element={<Login />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
