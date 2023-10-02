import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Homepage } from "./pages/Homepage";
import { Products } from "./pages/Products";
import { Pricing } from "./pages/Pricing";
import { ErrorPage } from "./pages/ErrorPage";
import { Applayout } from "./pages/Applayout";

function App() {
  return (
    <div>
      <h2>Welcome to my Website</h2>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/Pricing" element={<Pricing />} />
          <Route path="/App" element={<Applayout />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
