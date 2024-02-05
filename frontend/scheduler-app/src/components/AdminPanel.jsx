
import SideBarAdmin from "./SideBarAdmin"
import CalendarAdmin from './CalendarAdmin'
import styles from './AdminPanel.module.css'


function AdminPanel() {





    return (
        <div className={styles.adminPanel}>

            <SideBarAdmin />
            <CalendarAdmin />

        </div >
    )
}

export default AdminPanel
