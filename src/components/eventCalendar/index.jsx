import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import './styles.css'
import PropTypes from 'prop-types';

export default function EventCalendar({days}) {
    const mockDays = [
        new Date(), 
        new Date("September 17, 2023"), 
        new Date("September 30, 2023"), 
        new Date("August 29, 2023")
    ];

    //we could also use UseState

    return (
        <DayPicker
            mode="multiple"
            selected={mockDays}
            showOutsideDays 
        />
    )
}

EventCalendar.propTypes = {
    days: PropTypes.arrayOf(Date)
}