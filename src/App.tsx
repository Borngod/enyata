import { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ListView from "./Pages/ListView";
import { Analytics } from "@vercel/analytics/react"



function App() {
  const [theme, setTheme] = useState<string>("theme1");

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<HomePage theme={theme} setTheme={setTheme} />}
        />
        <Route
          path="/list"
          element={<ListView theme={theme} setTheme={setTheme} />}
        />
      </Routes>
      <Analytics/>
    </Router>
  );
}

export default App;
