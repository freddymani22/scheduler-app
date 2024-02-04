
import { useState } from 'react';
import styles from './CandEditModal.module.css'
import Axios from 'axios';



function CandEditModal({ editModal, setEditModal, userData, setUserData }) {
    const [firstName, setFirstName] = useState(userData.first_name);
    const [lastName, setLastName] = useState(userData.last_name);
    const [skills, setSkills] = useState(userData.skills);

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
                skills: skills,
            };

            await Axios.put(`${BASE_URL}/candidate/details/`, updatedData, { headers });

            setUserData({ firstName, lastName, skills })
            handleModelClose();
        } catch (error) {

            console.error('Error updating candidate details:', error);
        }
    };

    return (
        <>
            <div className={`${styles.modal} ${editModal ? '' : styles.hidden}`}>
                <p className={styles.title}>UPDATE DETAILS</p>
                <button className={styles.modalClose} onClick={handleModelClose}>
                    &times;
                </button>

                <form className={styles.modelForm} onSubmit={(e) => { updateCandDetails(e) }}>
                    <input
                        className="input"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                    />
                    <input
                        placeholder="Last Name"
                        className="input"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <textarea
                        placeholder="Skills"
                        className="input"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                    />
                    <button className={styles.modelFormBtn} >
                        Update
                    </button>
                </form>
            </div>
            <div className={`overlay ${editModal ? styles.overlay : styles.hidden}`}></div>
        </>
    );
}

export default CandEditModal
