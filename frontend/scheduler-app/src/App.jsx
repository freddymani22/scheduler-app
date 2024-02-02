
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Authenticate from "./components/Authenticate";
import Home from "./components/Home";
import { useEffect, useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import axios from "axios";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

  useEffect(() => {
    async function fetchData() {

      const token = localStorage.getItem("jwtToken");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      let response;
      try {
        response = await axios.get(
          `${BASE_URL}/home`,
          {
            headers,
          }
        );
        if (response.status === 200) {

          setIsAuthenticated(true);
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [, isAuthenticated, , setIsAuthenticated, setIsLoading]);


  if (isLoading)
    return (<p>Loadin....</p>
    )
  return (
    <Router>
      <Routes>
        <Route path='/' element={<ProtectedRoute isAuthenticated={isAuthenticated}><Home /></ProtectedRoute>} />
        <Route path="/login" element={<Authenticate setIsAuthenticated={setIsAuthenticated} />} />

      </Routes>
    </Router>
  );
}

export default App;
