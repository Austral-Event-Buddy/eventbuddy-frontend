import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import './styles.css'
import PropTypes from 'prop-types';

export default function EventCalendar({ events, mode = "multiple", onClick }) {
    
    //we could also use UseState
    //onClick should be a function like (day)=>console.log(day.toDateString())
    

    return (
        <DayPicker
            mode={mode}
            selected={events}
            onDayClick={onClick}
            showOutsideDays
        />
    )
}

EventCalendar.propTypes = {
    events: PropTypes.oneOfType([Date], Date),
    mode: PropTypes.oneOf(["multiple", "single", "range"]),
    onClick: PropTypes.func
}