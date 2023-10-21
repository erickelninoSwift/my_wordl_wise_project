import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./pages/ProtectedRoute";
import { City } from "./components/City";
import { CityList } from "./components/CityList";
import { CountryList } from "./components/CountryList";
import Form from "./components/Form";
import { AuthContextProvider } from "./context/FakeAuthContext";
import { SpinnerFullPage } from "./components/SpinnerFullPage";

const Pricing = lazy(() => import("./pages/Pricing"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const Applayout = lazy(() => import("./pages/Applayout"));
const Login = lazy(() => import("./pages/Login"));
const Product = lazy(() => import("./pages/Product"));
const Homepage = lazy(() => import("./pages/Homepage"));

function App() {
  return (
    <div>
      <Router>
        <AuthContextProvider>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/Product" element={<Product />} />
              <Route path="/Pricing" element={<Pricing />} />
              <Route
                path="/App"
                element={
                  <ProtectedRoute>
                    <Applayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<CityList />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />

                <Route path="countries" element={<CountryList />} />

                <Route path="form" element={<Form />} />
              </Route>
              <Route path="/Login" element={<Login />} />
              <Route path="/*" element={<ErrorPage />} />
            </Routes>
          </Suspense>
        </AuthContextProvider>
      </Router>
    </div>
  );
}

export default App;
