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
import Form from "./components/Form";
import { AuthContextProvider } from "./context/FakeAuthContext";

function App() {
  return (
    <div>
      <Router>
        <AuthContextProvider>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/Product" element={<Product />} />
            <Route path="/Pricing" element={<Pricing />} />
            <Route path="/App" element={<Applayout />}>
              <Route index element={<CityList />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />

              <Route path="countries" element={<CountryList />} />

              <Route path="form" element={<Form />} />
            </Route>
            <Route path="/Login" element={<Login />} />
            <Route path="/*" element={<ErrorPage />} />
          </Routes>
        </AuthContextProvider>
      </Router>
    </div>
  );
}

export default App;
