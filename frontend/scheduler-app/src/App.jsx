import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Authenticate from "./components/Authenticate"; // Make sure to import your Authenticate component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Authenticate />} />
      </Routes>
    </Router>
  );
}

export default App;
