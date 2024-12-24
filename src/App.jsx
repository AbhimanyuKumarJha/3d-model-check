import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ThreeDMap from "./components/ThreeDMap";
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ThreeDMap model="" />} />
        <Route path="/2" element={<ThreeDMap model="2" />} />
        <Route path="/3" element={<ThreeDMap model="3" />} />
      </Routes>
    </Router>
  );
}

export default App;
