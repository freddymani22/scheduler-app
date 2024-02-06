import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminProtectedRoute({ children, isAuthenticated, isInterivewAdmin }) {
    const navigate = useNavigate();
    useEffect(function () {
        if (!isAuthenticated) navigate("/login")
    }, [isAuthenticated, navigate])

    return (
        isAuthenticated && isInterivewAdmin ? children : <p style={{ color: " #fff", fontSize: "2rem" }}>You cant access this page!</p>
    )
}


export default AdminProtectedRoute




