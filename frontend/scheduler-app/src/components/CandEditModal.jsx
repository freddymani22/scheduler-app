
import styles from './CandEditModal.module.css'
import { useState } from 'react';
import Axios from 'axios';



function CandEditModal({ editModal, setEditModal, userData, setUserData }) {
    const [firstName, setFirstName] = useState(userData.first_name);
    const [lastName, setLastName] = useState(userData.last_name);
    const [skills, setSkills] = useState(userData.skills);
    const [position, setPosition] = useState(userData.position);

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
                position: position
            };

            await Axios.put(`${BASE_URL}/candidate/details/`, updatedData, { headers });

            setUserData({ first_name: firstName, last_name: lastName, skills: skills, position: position, is_candidate: true });

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
                        placeholder="Enter First Name"
                    />

                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        id="lastName"
                        placeholder="Enter Last Name"
                        className="input"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />

                    <label htmlFor="skills">Skills:</label>
                    <textarea
                        id="skills"
                        placeholder="Enter Skills"
                        className="input"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                    />

                    <label htmlFor="position">Position:</label>
                    <input
                        id="position"
                        value={position}
                        type='text'
                        onChange={e => setPosition(e.target.value)}
                        placeholder='Enter Position'
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

export default CandEditModal
