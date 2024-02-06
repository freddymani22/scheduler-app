


import { useEffect, useState } from 'react';
import styles from './AdminDeleteUserModal.module.css'
import Axios from 'axios';





function AdminDeleteUserModal({ isModalOpen, setIsModalOpen }) {

    const [listUser, setListUser] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState('');

    const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

    const handleModelClose = () => {
        setIsModalOpen((showModel) => !showModel);
    };

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("jwtToken");
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            try {
                const response = await Axios.get(`${BASE_URL}/admin-panel/list-user/`, { headers });
                setListUser(response.data)

                // Additional logic if needed based on the response

                // Example: Closing a modal

            } catch (error) {
                console.error('Error updating candidate details:', error);
            }
        };

        // Call the function when the component mounts
        fetchUser();
    }, [BASE_URL,]); // Empty dependency array to ensure the effect runs only once on mount


    async function handleDeleteUser(e) {
        e.preventDefault();

        const token = localStorage.getItem("jwtToken");
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        try {
            // Make sure selectedUserId is not an empty string before making the request
            if (!selectedUserId) {
                console.error('No user selected for deletion');
                return;
            }

            await Axios.delete(`${BASE_URL}/admin-panel/user-delete/${selectedUserId}/`, { headers });

            setIsModalOpen(false);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }


    return (
        <>
            <div className={`${styles.modal} ${isModalOpen ? '' : styles.hidden}`}>
                <p className={styles.title}>DELETE AN USER</p>
                <button className={styles.modalClose} onClick={handleModelClose}>
                    &times;
                </button>

                <form className={styles.modelForm} onSubmit={(e) => { handleDeleteUser(e) }}>
                    <label htmlFor="email">User Email:</label>


                    <div className={styles.selectContainer}>
                        <select
                            value={selectedUserId}
                            onChange={(e) => setSelectedUserId(e.target.value)}
                            className={styles.selectInput}
                        >
                            <option value="" disabled>Select User</option>
                            {listUser.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.email}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button className={styles.modelFormBtn} type="submit">
                        DELETE
                    </button>
                </form>
            </div>
            <div className={`overlay ${isModalOpen ? styles.overlay : styles.hidden}`}></div>
        </>
    );
}

export default AdminDeleteUserModal
