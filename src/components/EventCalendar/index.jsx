import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import './styles.css'
import PropTypes from 'prop-types';

export default function EventCalendar({ events, mode = "multiple", onClick }) {
    return (
        <DayPicker
            mode={mode}
            selected={events.map(event => new Date(event.date))}
            onDayClick={onClick}
            showOutsideDays
        />
    )
}

EventCalendar.propTypes = {
    events: PropTypes.arrayOf(Date),
    mode: PropTypes.oneOf(["multiple", "single", "range"]),
    onClick: PropTypes.func
}