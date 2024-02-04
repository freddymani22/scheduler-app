import { useState } from 'react';
import styles from './NewSlotModal.module.css'
import { useDate } from './DateContext';


function NewSlotModal({ isModalOpen, setIsModalOpen }) {
    const { setSelectedDate, setFromTime, setToTime, selectedDate, toTime, handleFormSubmit } = useDate();


    const initialDate = selectedDate ? new Date(selectedDate) : new Date();


    console.log(initialDate.setHours(initialDate.getHours() + 5, initialDate.getMinutes() + 30));





    function handleModelClose() {

        setIsModalOpen(false)
    }





    return (
        <>
            <div className={`${styles.modal} ${isModalOpen ? '' : styles.hidden}`}>
                <p className={styles.title}>ADD AN INTERVIEW SLOT</p>
                <button className={styles.modalClose} onClick={handleModelClose}>
                    &times;
                </button>

                <form className={styles.modelForm} onSubmit={(e) => { handleFormSubmit(e) }}>
                    <label>Date:</label>
                    <input type="date" value={selectedDate.toISOString().split('T')[0]} onChange={(e) => setSelectedDate(e.target.valueAsDate)} required />

                    <label>From:</label>
                    <input type="time" value={initialDate.toISOString().slice(11, 16)} onChange={(e) => setFromTime(e.target.value)} required />

                    <label>To:</label>
                    <input type="time" value={toTime} onChange={(e) => setToTime(e.target.value)} required />

                    <button type="submit" className={styles.modelFormBtn}>
                        Update
                    </button>
                </form>

            </div>
            <div className={`overlay ${isModalOpen ? styles.overlay : styles.hidden}`}></div>
        </>
    );


}

export default NewSlotModal
