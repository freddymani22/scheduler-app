import styles from './SideBar.module.css'
import { useState } from 'react';

import CandEditModal from './CandEditModal';

import InterviewerEditModal from './InterviewerEditModal';



function SideBar({ userData, setUserData }) {
    const [editModal, setEditModal] = useState(false);

    console.log(userData)
    function handleEdit() {
        setEditModal((val) => !val);
    }




    return (
        <div className={styles.userProfileCard}>
            <div className={styles.cardHeader}>
                <h1 className={styles.userName}>Hello, {userData.first_name}</h1>
                <svg
                    onClick={handleEdit}
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 32 32"
                    className={styles.editIcon}
                >
                    <title>Edit</title>
                    <path d="M30 32h-28c-1.105 0-2-0.895-2-2v-28c0-1.105 0.895-2 2-2h20l-4 4h-14v24h24v-14l4-4v20c0 1.105-0.895 2-2 2zM8 24v-6l18-18h2l4 4v2l-18 18h-6zM17 17l11-11-2-2-11 11 2 2zM12 18l-2 2v2h2l2-2-2-2z"></path>
                </svg>
            </div>



            <div className={styles.cardContent}>
                {userData.is_candidate ? (
                    <div className={styles.section}>
                        <p className={styles.title}>Skills:</p>
                        <p className={styles.content}>{userData.skills}</p>
                    </div>
                ) : (
                    <>
                        {userData.previous_company && (
                            <div className={styles.section}>
                                <p className={styles.title}>Previous Company:</p>
                                <p className={styles.content}>{userData.previous_company}</p>
                            </div>
                        )}
                    </>
                )}

                {userData.position && (
                    <div className={styles.section}>
                        <p className={styles.title}>Position:</p>
                        <p className={styles.content}>{userData.position}</p>
                    </div>
                )}
            </div>


            <div className={styles.editModal}>
                {userData.is_candidate ? (
                    <CandEditModal
                        editModal={editModal}
                        setEditModal={setEditModal}
                        userData={userData}
                        setUserData={setUserData}
                    />
                ) : (
                    <InterviewerEditModal
                        editModal={editModal}
                        setEditModal={setEditModal}
                        userData={userData}
                        setUserData={setUserData}
                    />
                )}
            </div>
        </div>
    );
}

export default SideBar
