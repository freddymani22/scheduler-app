
import { useState } from 'react';
import styles from './SideBarAdmin.module.css'
import SchuduleInterviewModal from './SchuduleInterviewModal';
import AdminCreateUserModal from './AdminCreateUserModal';

function SideBarAdmin({ setAdminEvents }) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isaddUserModal, setIsAddUserModal] = useState(false);


    function handleInterviewSchedule(e) {
        e.preventDefault()
        setIsModalOpen(true)
    }

    function handleAddUser(e) {
        e.preventDefault();
        setIsAddUserModal(true)
        console.log('check')
    }

    return (
        <div className={styles.sideBarAdmin}>
            <div className={styles.sideMenu}>
                <button onClick={(e) => handleAddUser(e)}>Create an user</button>
                <button>Delete an user </button>
                <button onClick={(e) => handleInterviewSchedule(e)}>Schedule an Interview</button>
            </div>
            {isModalOpen && <SchuduleInterviewModal setAdminEvents={setAdminEvents} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />}
            {isaddUserModal && <AdminCreateUserModal isModalOpen={isaddUserModal} setIsModalOpen={setIsAddUserModal} />}


        </div>
    )
}

export default SideBarAdmin
