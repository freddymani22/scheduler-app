
import styles from './NavBar.module.css'
import axios from "axios";




import { NavLink } from 'react-router-dom';



const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;


function NavBar({ setIsAuthenticated, isAuthenticated, setIsInterivewAdmin, setUserData }) {



    async function handleLogout() {
        const token = localStorage.getItem("jwtToken");
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        try {


            // Send a POST request to your logout endpoint
            const response = await axios.post(
                `${BASE_URL}/accounts/logout/`,
                null,  // You can send an empty body for a logout request
                {
                    headers,
                }
            );

            if (response.status === 200) {
                // Clear local storage and update state upon successful logout
                localStorage.removeItem("jwtToken");
                setIsAuthenticated(false);
                setUserData({});
                setIsInterivewAdmin(false); // You might need to adjust this based on your application logic

            }
        } catch (error) {
            console.log(error);
        }
    }




    return (
        <nav className={styles.nav}>
            <ul>

                <li><NavLink to='/'>Scheduler</NavLink></li>
                {isAuthenticated && <li className={styles.logoutBtn} onClick={handleLogout}>Logout</li>}
            </ul>

        </nav>
    )
}

export default NavBar
