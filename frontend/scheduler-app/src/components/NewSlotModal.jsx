import { useState } from 'react';
import styles from './NewSlotModal.module.css'
import { useDate } from './DateContext';


function NewSlotModal({ isModalOpen, setIsModalOpen }) {
    const { setSelectedDate, setFromTime, setToTime, selectedDate, toTime, fromTime, handleFormSubmit } = useDate();




    const initialDate = selectedDate ? new Date(selectedDate) : new Date();



    initialDate.setHours(initialDate.getHours() + 5, initialDate.getMinutes() + 30);





    function handleModelClose() {

        setIsModalOpen(false)
    }


    async function handleDateSelect(e) {
        await setSelectedDate(e.target.valueAsDate)
    }


    async function handleFromTime(e) {

        await setFromTime(e.target.value)
    }



    async function handleToTime(e) {
        await setToTime(e.target.value)
    }








    return (
        <>
            <div className={`${styles.modal} ${isModalOpen ? '' : styles.hidden}`}>
                <p className={styles.title}>ADD AN INTERVIEW SLOT</p>
                <button className={styles.modalClose} onClick={handleModelClose}>
                    &times;
                </button>

                <form className={styles.modelForm} onSubmit={(e) => { handleFormSubmit(e); setIsModalOpen(false); }}>
                    <label>Date:</label>
                    <input type="date" value={initialDate.toISOString().split('T')[0]} onChange={e => handleDateSelect(e)} required />

                    <label>From:</label>
                    <input type="time" value={fromTime} onChange={(e) => handleFromTime(e)} required />

                    <label>To:</label>
                    <input type="time" value={toTime} onChange={(e) => handleToTime(e)} required />

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
