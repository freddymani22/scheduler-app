
import { useState } from 'react';
import styles from './SideBarAdmin.module.css'
import SchuduleInterviewModal from './SchuduleInterviewModal';

function SideBarAdmin() {

    const [isModalOpen, setIsModalOpen] = useState(false);


    function handleInterviewSchedule(e) {
        e.preventDefault()
        setIsModalOpen(true)
    }

    return (
        <div className={styles.sideBarAdmin}>

            <div className={styles.sideMenu}>
                <button>Create an user</button>
                <button>Delete an user </button>
                <button onClick={(e) => handleInterviewSchedule(e)}>Schedule an Interview</button>
            </div>
            {isModalOpen && <SchuduleInterviewModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />}

        </div>
    )
}

export default SideBarAdmin
