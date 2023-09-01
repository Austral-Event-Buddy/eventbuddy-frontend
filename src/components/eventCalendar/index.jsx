import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import './styles.css'

export default function EventCalendar() {
    const [selected, setSelected] = useState([]);

    return (
        <DayPicker
            mode="multiple"
            selected={selected}
            onSelect={setSelected}
            showOutsideDays 
        />
    )
}