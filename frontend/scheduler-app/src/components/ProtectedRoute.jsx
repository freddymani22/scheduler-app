import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ isAuthenticated, children }) {

    const navigate = useNavigate();
    useEffect(function () {
        if (!isAuthenticated) navigate("/login")
    }, [isAuthenticated, navigate])

    return (
        isAuthenticated ? children : null
    )
}

export default ProtectedRoute
