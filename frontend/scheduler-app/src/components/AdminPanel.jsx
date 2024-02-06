
import SideBarAdmin from "./SideBarAdmin"
import CalendarAdmin from './CalendarAdmin'
import styles from './AdminPanel.module.css'
import { useState } from "react";


function AdminPanel() {

    const [adminEvents, setAdminEvents] = useState([]);



    return (
        <div className={styles.adminPanel}>

            <SideBarAdmin setAdminEvents={setAdminEvents} />
            <CalendarAdmin setAdminEvents={setAdminEvents} adminEvents={adminEvents} />

        </div >
    )
}

export default AdminPanel
