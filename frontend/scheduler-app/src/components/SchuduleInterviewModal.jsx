

import { useState } from 'react';
import styles from './SchuduleInterviewModal.module.css'


import axios from 'axios';

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;



const ScheduleInterviewModal = ({ isModalOpen, setIsModalOpen, setAdminEvents }) => {
    const [selectedCandidate, setSelectedCandidate] = useState('');
    const [selectedInterviewer, setSelectedInterviewer] = useState('');
    const [dateValue, setDateValue] = useState('');
    const [startTimeValue, setStartTimeValue] = useState('');
    const [endTimeValue, setEndTimeValue] = useState('');
    const [availableCandidateList, setAvailableCandidateList] = useState([]);
    const [availableInterviewersList, setAvailableInterviewersList] = useState([]);
    const [isDateTimeSelected, setIsDateTimeSelected] = useState(false);
    const [interviewTitle, setInterviewTitle] = useState('');

    // Handler for candidate selection
    const handleCandidateChange = (event) => {
        setSelectedCandidate(event.target.value);
        // You can perform additional actions related to candidate selection if needed
    };

    // Handler for interviewer selection
    const handleInterviewerChange = (event) => {
        setSelectedInterviewer(event.target.value);
        // You can perform additional actions related to interviewer selection if needed
    };

    // Handler for closing the modal
    const handleModelClose = () => {
        setIsModalOpen(false);
    };

    // Handler for date, start time, and end time changes
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


    const handleInterviewTitleChange = (event) => {
        setInterviewTitle(event.target.value);
    };



    const handleInterviewSchedule = async () => {
        if (selectedCandidate && selectedInterviewer) {
            try {
                const token = localStorage.getItem("jwtToken");
                const headers = {
                    Authorization: `Bearer ${token}`,
                };

                // Make a POST request to schedule the interview
                await axios.put(`${BASE_URL}/admin-panel/update-availability-title/`, {
                    candidate_availability_id: selectedCandidate,
                    interviewer_availability_id: selectedInterviewer,
                    interview_title: interviewTitle,
                }, { headers });

                // Fetch updated events after scheduling
                const response = await axios.get(`${BASE_URL}/admin-panel/`, { headers });
                if (response.status === 200) {
                    const formattedEvents = response.data.map(({ id, candidate, ...rest }) => ({
                        title: `${rest.title}-${candidate}`,
                        start: new Date(rest.start),
                        end: new Date(rest.end),
                    }));


                    setAdminEvents(formattedEvents);
                    setIsModalOpen(false)
                }



            } catch (error) {
                console.error('Error scheduling interview:', error);

            }
        }
    };



    const handleDateTimeSubmit = async (event) => {
        event.preventDefault();

        if (dateValue !== '' && startTimeValue !== '' && endTimeValue !== '') {
            try {
                const token = localStorage.getItem("jwtToken");
                const headers = {
                    Authorization: `Bearer ${token}`,
                };


                const response = await axios.post(`${BASE_URL}/admin-panel/available-candidate/`, {
                    date: dateValue,
                    available_from: startTimeValue,
                    available_to: endTimeValue,
                }, { headers });

                setAvailableInterviewersList(response.data.interviewers);
                setAvailableCandidateList(response.data.candidates)
                setIsDateTimeSelected(true);

            } catch (error) {
                console.error('Error fetching candidate and interviewer lists:', error);
            }
        }
    };


    return (
        <>
            <div className={`${styles.modal} ${isModalOpen ? '' : styles.hidden}`}>
                <p className={styles.title}>SCHEDULE AN INTERVIEW</p>
                <button className={styles.modalClose} onClick={handleModelClose}>
                    &times;
                </button>
                <form onSubmit={handleDateTimeSubmit}>
                    <label>Date:</label>
                    <input type="date" onChange={handleDateChange} />
                    <label>Start Time:</label>
                    <input type="time" onChange={handleStartTimeChange} />
                    <label>End Time:</label>
                    <input type="time" onChange={handleEndTimeChange} />
                    {!isDateTimeSelected && <button type="submit">Load Candidates</button>}
                </form>

                {isDateTimeSelected && (
                    <>
                        <label>Select Candidate:</label>
                        <select value={selectedCandidate} onChange={handleCandidateChange} required>
                            <option value="" disabled>Select Candidate</option>
                            {availableCandidateList.map((candidate) => (
                                <option key={candidate.id} value={candidate.id}>
                                    {candidate.email}
                                </option>
                            ))}
                        </select>

                        <label>Select Interviewer:</label>
                        <select value={selectedInterviewer} onChange={handleInterviewerChange} required>
                            <option value="" disabled>Select Interviewer</option>
                            {availableInterviewersList.map((interviewer) => (
                                <option key={interviewer.id} value={interviewer.id}>
                                    {interviewer.email}
                                </option>
                            ))}
                        </select>
                        {availableCandidateList.length === 0 || availableInterviewersList.length === 0 ? <p className={styles.error}>Either a cadidate or  an interviewer is unavailable in the given time slot</p> : <><label>INTERVIEW TITLE</label>
                            <input type='text' required value={interviewTitle} onChange={handleInterviewTitleChange} /></>}

                        {!(availableCandidateList.length === 0 || availableInterviewersList.length === 0) && <button onClick={handleInterviewSchedule}>Schedule Interview</button>}
                    </>
                )}
            </div>
            <div className={`overlay ${isModalOpen ? styles.overlay : styles.hidden}`}></div>
        </>
    );
};

export default ScheduleInterviewModal;