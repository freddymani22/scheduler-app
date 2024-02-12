
import { useState } from 'react';
import styles from './SideBarAdmin.module.css'
import SchuduleInterviewModal from './SchuduleInterviewModal';
import AdminCreateUserModal from './AdminCreateUserModal';

import AdminDeleteUserModal from './AdminDeleteUserModal';

function SideBarAdmin({ setAdminEvents }) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isaddUserModal, setIsAddUserModal] = useState(false);
    const [isDeleteModal, setIsDeleteModal] = useState(false);



    function handleInterviewSchedule(e) {
        e.preventDefault()
        setIsModalOpen(true)
    }

    function handleAddUser(e) {
        e.preventDefault();
        setIsAddUserModal(true)

    }


    function handleDeleteUser(e) {
        e.preventDefault();
        setIsDeleteModal(true)



    }


    return (
        <div className={styles.sideBarAdmin}>
            <div className={styles.sideMenu}>
                <button onClick={(e) => handleAddUser(e)}>Create an user</button>
                <button onClick={e => handleDeleteUser(e)}>Delete an user </button>
                <button onClick={(e) => handleInterviewSchedule(e)}>Schedule an Interview</button>
            </div>
            {isModalOpen && <SchuduleInterviewModal setAdminEvents={setAdminEvents} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />}
            {isaddUserModal && <AdminCreateUserModal isModalOpen={isaddUserModal} setIsModalOpen={setIsAddUserModal} />}
            {isDeleteModal && <AdminDeleteUserModal isModalOpen={isDeleteModal} setIsModalOpen={setIsDeleteModal} />}

        </div>
    )
}

export default SideBarAdmin
