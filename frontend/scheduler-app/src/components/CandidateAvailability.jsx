


import { useDate } from './DateContext';


function CandidateAvailability() {
    const { setSelectedDate, setFromTime, setToTime, selectedDate, fromTime, toTime, handleFormSubmit } = useDate();


    return (
        <div>
            <p>Update Availability</p>
            <form onSubmit={(e) => handleFormSubmit(e)}>
                <label>Date:</label>
                <input type="date" value={selectedDate.toISOString().split('T')[0]} onChange={(e) => setSelectedDate(e.target.valueAsDate)} />

                <label>From:</label>
                <input type="time" value={fromTime} onChange={(e) => setFromTime(e.target.value)} />

                <label>To:</label>
                <input type="time" value={toTime} onChange={(e) => setToTime(e.target.value)} />
                <button>Update</button>
            </form>
        </div>
    );
}

export default CandidateAvailability;
