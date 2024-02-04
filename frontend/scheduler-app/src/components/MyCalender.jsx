import { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from './MyCalender.module.css';


import axios from 'axios';
import { useDate } from './DateContext';
import CalendarModal from './CalendarModal'
import NewSlotModal from './NewSlotModal';




const MyCalendar = () => {
    const { events, setSelectedDate } = useDate();
    const [selectedEvent, setSelectEvent] = useState('');


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isNewSlotModal, setIsNewSlotModal] = useState(false)


    const localizer = momentLocalizer(moment);


    const handleSlotSelect = ({ start, end, slots }) => {


        setSelectedDate(start)
        setIsNewSlotModal(true)

    };



    function handleSelectEvent(e) {
        setSelectedDate(e)
        setIsModalOpen(true)
        console.log(e)

    }
    return (
        <div style={{ height: '500px' }} className={styles.myCalender}>
            <Calendar
                onSelectEvent={(e) => handleSelectEvent(e)}
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ width: '90%' }}
                onSelectSlot={handleSlotSelect}

                selectable
            />
            {isModalOpen && <CalendarModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} selectedEvent={selectedEvent} />}
            {isNewSlotModal && <NewSlotModal isModalOpen={isNewSlotModal} setIsModalOpen={setIsNewSlotModal} />}
        </div>
    );
};

export default MyCalendar;
