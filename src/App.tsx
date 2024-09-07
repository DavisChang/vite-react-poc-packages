import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";

import AboutPage from "./pages/AboutPage";
import XStatePage from "./pages/XStatePage";
import NoMatch from "./pages/NoMatch";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<XStatePage />} />
            <Route path="/about" element={<AboutPage />} />
          </Route>

          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
