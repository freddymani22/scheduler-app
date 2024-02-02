import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from './MyCalender.module.css'
const MyCalendar = () => {
    const localizer = momentLocalizer(moment);

    const [events, setEvents] = useState([
        {
            title: 'Event 1',
            start: new Date(2024, 1, 1, 10, 0),
            end: new Date(2024, 1, 1, 12, 0),
        },
        {
            title: 'Event 2',
            start: new Date(2024, 1, 2, 14, 0),
            end: new Date(2024, 1, 2, 16, 0),
        },
        // Add more events as needed
    ]);

    return (
        <div style={{ height: '500px' }} className={styles.myCalender}>
            <Calendar
                onSelectEvent={(e) => console.log(e)}
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ width: '100%' }}
            />
        </div>
    );
};

export default MyCalendar;
