import axios from "axios";


import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";



import ProtectedRoute from "./components/ProtectedRoute";
import Authenticate from "./components/Authenticate";
import Home from "./components/Home";
import AdminPanel from "./components/AdminPanel";
import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import AdminProtectedRoute from "./components/AdminProtectedRoute";




function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isInterivewAdmin, setIsInterivewAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState({});

  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

  useEffect(() => {
    async function fetchData() {

      const token = localStorage.getItem("jwtToken");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      let response;
      try {
        setIsLoading(true)
        response = await axios.get(
          `${BASE_URL}/candidate/details/`,
          {
            headers,
          }
        );

        if (response.status === 200) {

          setIsAuthenticated(true);
          setUserData(response.data)
          setIsInterivewAdmin(response.data.is_interview_admin)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [isAuthenticated, setIsAuthenticated, BASE_URL, setIsLoading]);


  if (isLoading) return <Loading />



  return (
    <>

      <Router>
        <NavBar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} setUserData={setUserData} setIsInterivewAdmin={setIsInterivewAdmin} />
        <Routes>
          <Route
            path="/"
            element={
              isInterivewAdmin ? (
                <Navigate to="/admin" replace={true} />
              ) : (
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Home userData={userData} setUserData={setUserData} />
                </ProtectedRoute>
              )
            }
          />
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute isAuthenticated={isAuthenticated} isInterivewAdmin={isInterivewAdmin}>
                <AdminPanel />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <Authenticate
                setIsAuthenticated={setIsAuthenticated}
                setIsInterivewAdmin={setIsInterivewAdmin}
                isInterivewAdmin={isInterivewAdmin}
              />
            }
          />
        </Routes>
      </Router >
    </>
  );
}

export default App;
