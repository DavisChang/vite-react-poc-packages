import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";

import AboutPage from "./pages/AboutPage";
import XStatePage from "./pages/XStatePage";
import NoMatch from "./pages/NoMatch";
import RecursiveList from "./pages/RecursiveList";
import DesignSystemTailwind from "./pages/DesignSystemTailwind";
import TestPage from "./pages/TestPage";
import ThemeContextPage from "./pages/ThemeContextPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<XStatePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/recursive" element={<RecursiveList />} />
            <Route path="/design" element={<DesignSystemTailwind />} />
            <Route path="/theme" element={<ThemeContextPage />} />

            <Route path="/test" element={<TestPage />} />
          </Route>

          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
