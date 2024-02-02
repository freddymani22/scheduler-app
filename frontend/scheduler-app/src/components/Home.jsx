
import MyCalendar from "./MyCalender"
import SideBar from "./SideBar"

import styles from './Home.module.css'

function Home() {
    return (
        <div className={styles.home}>
            <SideBar />
            <MyCalendar />

        </div>
    )
}

export default Home
