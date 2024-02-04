import { createContext, useContext, useEffect, useState } from "react";

import axios from 'axios';



const DateContext = createContext();


function DateProvider({ children }) {


    const [selectedDate, setSelectedDate] = useState(new Date());
    const [fromTime, setFromTime] = useState('');
    const [toTime, setToTime] = useState('');
    const [events, setEvents] = useState([]);





    const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;


    async function handleFormSubmit(e) {
        e.preventDefault();
        const fromDateTime = new Date(selectedDate);
        const toDateTime = new Date(selectedDate);

        const [fromHours, fromMinutes] = fromTime.split(':').map(Number);
        const [toHours, toMinutes] = toTime.split(':').map(Number);

        fromDateTime.setHours(fromHours);
        fromDateTime.setMinutes(fromMinutes);

        toDateTime.setHours(toHours);
        toDateTime.setMinutes(toMinutes);


        const data = {
            start: fromDateTime.toISOString(),
            end: toDateTime.toISOString(),
        };
        setEvents(prevEvents => [...prevEvents, { title: "Available", ...data }]);


        const token = localStorage.getItem("jwtToken");
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        try {
            const response = await axios.post(`${BASE_URL}/candidate/candidate-availability/`, data, {
                headers,
            });

            if (response.status === 200) {
                // Handle success, if needed
            }
        } catch (error) {
            console.error('Error updating availability:', error);
        }
    }

    useEffect(() => {
        const fetchEvents = async () => {
            const token = localStorage.getItem("jwtToken");
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            try {
                const response = await axios.get(`${BASE_URL}/candidate/candidate-availability/`, { headers });
                if (response.status === 200) {
                    const formattedEvents = response.data.map(event => ({
                        title: event.title,
                        start: new Date(event.start),
                        end: new Date(event.end),
                    }));

                    setEvents(formattedEvents)

                }
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, [BASE_URL]);


    return <DateContext.Provider value={{ selectedDate, setSelectedDate, fromTime, setFromTime, toTime, setToTime, handleFormSubmit, events }} >


        {children}
    </DateContext.Provider>

}


function useDate() {
    const context = useContext(DateContext);
    if (context === undefined) throw new Error("DateContext was used outside the CitiesProvider")
    return context

}


export { DateProvider, useDate }