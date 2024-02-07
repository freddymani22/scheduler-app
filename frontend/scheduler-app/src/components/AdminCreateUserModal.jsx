import { useState } from "react";
import styles from './AdminCreateUserModal.module.css'
import Axios from 'axios';

function AdminCreateUserModal({ isModalOpen, setIsModalOpen }) {
    const [userEmail, setUserEmail] = useState('');
    const [userType, setUserType] = useState('candidate')

    const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

    const handleModelClose = () => {
        setIsModalOpen((showModel) => !showModel);
    };

    const updateCandDetails = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem("jwtToken");
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        try {
            const data = {
                email: userEmail,
                user_type: userType


            };
            console.log(userType)
            await Axios.post(`${BASE_URL}/admin-panel/create-user/`, data, { headers });



            handleModelClose();
        } catch (error) {

            console.error('Error updating candidate details:', error);
        }
    };

    return (
        <>
            <div className={`${styles.modal} ${isModalOpen ? '' : styles.hidden}`}>
                <p className={styles.title}>CREATE A USER</p>
                <button className={styles.modalClose} onClick={handleModelClose}>
                    &times;
                </button>

                <form className={styles.modelForm} onSubmit={(e) => { updateCandDetails(e, userType) }}>
                    <label htmlFor="email">User Email:</label>
                    <input
                        id="email"
                        className="input"
                        type="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        placeholder="Email"
                    />

                    <div className={styles.radioContainer}>
                        <div className={styles.inputField}>
                            <input
                                type="radio"

                                value="candidate"
                                checked={userType === 'candidate'}
                                onChange={() => setUserType('candidate')}
                            />
                            <label className={styles.radioLabel}>Candidate</label>

                        </div>
                        <div className={styles.inputField}>
                            <input
                                type="radio"
                                value="interviewer"
                                checked={userType === 'interviewer'}
                                onChange={() => setUserType('interviewer')}
                            />
                            <label className={styles.radioLabel}>Interviewer</label>

                        </div>
                    </div>

                    <button className={styles.modelFormBtn} type="submit">
                        CREATE
                    </button>
                </form>
            </div>
            <div className={`overlay ${isModalOpen ? styles.overlay : styles.hidden}`}></div>
        </>
    );
}

export default AdminCreateUserModal
