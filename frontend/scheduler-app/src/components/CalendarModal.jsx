import { useState } from 'react'
import styles from './CalendarModal.module.css'



function CalendarModal({ isModalOpen, setIsModalOpen, selectedEvent }) {
    const [selectedDate, setSelectedDate] = useState(selectedEvent ? new Date(selectedEvent.start) : new Date());

    const [fromTime, setFromTime] = useState(
        selectedEvent && selectedEvent.start ? selectedEvent.start.toISOString().slice(11, 16) : ""
    );
    const [toTime, setToTime] = useState(
        selectedEvent && selectedEvent.end ? selectedEvent.end.toISOString().slice(11, 16) : ""
    );





    function handleModelClose() {

        setIsModalOpen(false)
    }


    function updateEventDetails() {


    }


    return (
        <>
            <div className={`${styles.modal} ${isModalOpen ? '' : styles.hidden}`}>
                <p className={styles.title}>UPDATE DETAILS</p>
                <button className={styles.modalClose} onClick={handleModelClose}>
                    &times;
                </button>
                {selectedEvent.title === 'Available' ? (
                    <form className={styles.modelForm} onSubmit={(e) => { updateEventDetails(e) }}>
                        <label>Date:</label>
                        <input type="date" value={selectedDate.toISOString().split('T')[0]} onChange={(e) => setSelectedDate(e.target.valueAsDate)} />

                        <label>From:</label>
                        <input type="time" value={fromTime} onChange={(e) => setFromTime(e.target.value)} />

                        <label>To:</label>
                        <input type="time" value={toTime} onChange={(e) => setToTime(e.target.value)} />

                        <button type="submit" className={styles.modelFormBtn}>
                            Update
                        </button>
                    </form>
                ) : (
                    <>
                        <p>Interview:{selectedEvent.title}</p>
                        <p>Starts at:{selectedEvent.start.toLocaleString()}</p>
                        <p>Ends at:{selectedEvent.end.toLocaleString()}</p>
                    </>
                )}
            </div>
            <div className={`overlay ${isModalOpen ? styles.overlay : styles.hidden}`}></div>
        </>
    );

}

export default CalendarModal
