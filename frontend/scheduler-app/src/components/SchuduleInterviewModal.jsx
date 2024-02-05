

import { useState } from 'react';
import styles from './SchuduleInterviewModal.module.css'


import axios from 'axios';

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

function SchuduleInterviewModal({ isModalOpen, setIsModalOpen }) {
    const [selectedCandidate, setSelectedCandidate] = useState('');
    const [selectedInterviewer, setSelectedInterviewer] = useState('');
    const [dateValue, setDateValue] = useState('');
    const [startTimeValue, setStartTimeValue] = useState('');
    const [endTimeValue, setEndTimeValue] = useState('');
    const [candidateList, setCandidateList] = useState([]);
    const [isDateTimeSelected, setIsDateTimeSelected] = useState(false);

    const handleCandidateChange = (event) => {
        setSelectedCandidate(event.target.value);
        // You can perform additional actions related to candidate selection if needed
    };

    const handleInterviewerChange = (event) => {
        setSelectedInterviewer(event.target.value);
        // You can perform additional actions related to interviewer selection if needed
    };

    const handleModelClose = () => {
        setIsModalOpen(false);
    };

    const handleDateTimeChange = () => {

    };

    const handleDateChange = (event) => {
        setDateValue(event.target.value);
        setIsDateTimeSelected(false); // Reset when the date changes
    };

    const handleStartTimeChange = (event) => {
        setStartTimeValue(event.target.value);
        setIsDateTimeSelected(false); // Reset when the start time changes
    };

    const handleEndTimeChange = (event) => {
        setEndTimeValue(event.target.value);
        setIsDateTimeSelected(false); // Reset when the end time changes
    };

    const handleDateTimeSubmit = async (event) => {
        event.preventDefault();

        if (dateValue !== '' && startTimeValue !== '' && endTimeValue !== '') {
            try {
                const token = localStorage.getItem("jwtToken");
                const headers = {
                    Authorization: `Bearer ${token}`,
                };
                // Make a POST request to get the candidate list based on the selected date and time
                const response = await axios.post(`${BASE_URL}/admin-panel/available-canditate/`, {
                    date: dateValue,
                    available_from: startTimeValue,
                    available_to: endTimeValue,
                }, { headers });

                await setCandidateList(response.data.candidates);
                console.log(candidateList)
                await setIsDateTimeSelected(true);

            } catch (error) {
                console.error('Error fetching candidate list:', error);
            }
        }
    };

    return (
        <>
            <div className={`${styles.modal} ${isModalOpen ? '' : styles.hidden}`}>
                <p className={styles.title}>UPDATE DETAILS</p>
                <button className={styles.modalClose} onClick={handleModelClose}>
                    &times;
                </button>
                <form onSubmit={handleDateTimeSubmit}>
                    <input type="date" onChange={handleDateChange} />
                    <input type="time" onChange={handleStartTimeChange} />
                    <input type="time" onChange={handleEndTimeChange} />
                    {!isDateTimeSelected && <button type="submit">Load Candidate</button>}
                </form>

                {isDateTimeSelected && (
                    <>
                        <select value={selectedCandidate} onChange={handleCandidateChange}>
                            <option value="" disabled>
                                Select Candidate
                            </option>
                            {candidateList.map((candidate) => (
                                <option key={candidate.id} value={candidate.id}>
                                    {candidate.email}
                                </option>
                            ))}
                        </select>

                        <select value={selectedInterviewer} onChange={handleInterviewerChange}>
                            <option value="" disabled>
                                Select Interviewer
                            </option>
                            {/* Populate the interviewer list if needed */}
                        </select>
                        <button>schedule interview</button>
                    </>
                )}
            </div>
            <div className={`overlay ${isModalOpen ? styles.overlay : styles.hidden}`}></div>
        </>
    );
}


export default SchuduleInterviewModal
