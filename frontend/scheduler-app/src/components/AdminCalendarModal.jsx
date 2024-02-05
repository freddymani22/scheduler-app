
import styles from './AdminCalendarModal.module.css'





function AdminCalendarModal({ isModalOpen, setIsModalOpen, selectedEvent }) {

    function handleModelClose() {

        setIsModalOpen(false)
    }


    return (
        <>
            <div className={`${styles.modal} ${isModalOpen ? '' : styles.hidden}`}>
                <p className={styles.title}>UPDATE DETAILS</p>
                <button className={styles.modalClose} onClick={handleModelClose}>
                    &times;
                </button>

                {selectedEvent.title.startsWith('Available') ? (
                    <>
                        <p>{selectedEvent.title}</p>
                        <p>Available from: {selectedEvent.start.toLocaleString()}</p>
                        <p>Available until: {selectedEvent.end.toLocaleString()}</p>
                    </>
                ) : (
                    <>
                        <p>Interview: {selectedEvent.title}</p>
                        <p>Starts at: {selectedEvent.start.toLocaleString()}</p>
                        <p>Ends at: {selectedEvent.end.toLocaleString()}</p>
                    </>
                )}


            </div>
            <div className={`overlay ${isModalOpen ? styles.overlay : styles.hidden}`}></div>
        </>

    )
}

export default AdminCalendarModal
