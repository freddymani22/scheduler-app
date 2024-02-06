import { useState } from 'react';
import styles from './InterviewerEditModal.module.css'
import Axios from 'axios';

function InterviewerEditModal({ editModal, setEditModal, userData, setUserData }) {
    const [firstName, setFirstName] = useState(userData.first_name);
    const [lastName, setLastName] = useState(userData.last_name);
    const [previousCompany, setPreviousCompany] = useState(userData.previous_company);
    const [position, setPosition] = useState(userData.position)

    const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

    const handleModelClose = () => {
        setEditModal((showModel) => !showModel);
    };

    const updateCandDetails = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem("jwtToken");
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        try {
            const updatedData = {
                first_name: firstName,
                last_name: lastName,
                previous_company: previousCompany,
                position: position

            };

            await Axios.put(`${BASE_URL}/candidate/details/`, updatedData, { headers });

            setUserData({ first_name: firstName, last_name: lastName, previous_company: previousCompany, position: position });

            handleModelClose();
        } catch (error) {

            console.error('Error updating candidate details:', error);
        }
    };

    return (
        <>
            <div className={`${styles.modal} ${editModal ? '' : styles.hidden}`}>
                <p className={styles.title}>UPDATE PROFILE</p>
                <button className={styles.modalClose} onClick={handleModelClose}>
                    &times;
                </button>

                <form className={styles.modelForm} onSubmit={(e) => { updateCandDetails(e) }}>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        id="firstName"
                        className="input"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                    />

                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        id="lastName"
                        placeholder="Last Name"
                        className="input"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />

                    <label htmlFor="previousCompany">Previous Company:</label>
                    <input
                        id="previousCompany"
                        placeholder="Previous Company"
                        value={previousCompany}
                        type='text'
                        onChange={e => setPreviousCompany(e.target.value)}
                    />

                    <label htmlFor="position">Position:</label>
                    <input
                        id="position"
                        value={position}
                        type='text'
                        onChange={e => setPosition(e.target.value)}
                        placeholder='Position'
                    />

                    <button className={styles.modelFormBtn} type="submit">
                        Update
                    </button>
                </form>

            </div>
            <div className={`overlay ${editModal ? styles.overlay : styles.hidden}`}></div>
        </>
    );
}

export default InterviewerEditModal
