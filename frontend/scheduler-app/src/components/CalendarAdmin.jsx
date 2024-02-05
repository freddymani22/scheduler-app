import { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from './MyCalender.module.css';

import AdminCalendarModal from './AdminCalendarModal';

import axios from 'axios';




const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;


const MyCalendar = () => {
    const [adminEvents, setAdminEvents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isNewSlotModal, setIsNewSlotModal] = useState(false)
    const [selectedEvent, setSelectEvent] = useState('');

    const localizer = momentLocalizer(moment);


    useEffect(() => {
        const fetchEvents = async () => {
            const token = localStorage.getItem("jwtToken");
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            try {
                const response = await axios.get(`${BASE_URL}/admin-panel/`, { headers });
                if (response.status === 200) {


                    const formattedEvents = response.data.map(({ id, candidate, ...rest }) => ({
                        title: `${rest.title}-${candidate}`,
                        start: new Date(rest.start),
                        end: new Date(rest.end),
                    }));


                    setAdminEvents(formattedEvents)


                }
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);




    function handleSelectEvent(e) {

        setSelectEvent(e)
        setIsModalOpen(true)


    }
    return (
        <div style={{ height: '500px' }} className={styles.myCalender}>
            <Calendar
                onSelectEvent={(e) => handleSelectEvent(e)}
                localizer={localizer}
                events={adminEvents}
                startAccessor="start"
                endAccessor="end"
                style={{ width: '90%' }}
                // onSelectSlot={handleSlotSelect}

                selectable
            />
            {isModalOpen && <AdminCalendarModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setAdminEvents={setAdminEvents} selectedEvent={selectedEvent} />}
            {/* {isNewSlotModal && <NewSlotModal isModalOpen={isNewSlotModal} setIsModalOpen={setIsNewSlotModal} />} */}
        </div>
    );
};

export default MyCalendar;
