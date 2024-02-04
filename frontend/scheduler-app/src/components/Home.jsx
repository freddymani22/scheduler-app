
import MyCalendar from "./MyCalender"
import SideBar from "./SideBar"

import styles from './Home.module.css'

import { DateProvider } from './DateContext'

function Home({ userData, setUserData }) {





    return (
        <div className={styles.home}>
            <DateProvider>

                <SideBar userData={userData} setUserData={setUserData} />
                <MyCalendar />
            </DateProvider>

        </div>
    )
}

export default Home
