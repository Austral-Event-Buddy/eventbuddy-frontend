import TextField from '../../components/common/TextField';
import Button from '../../components/common/Button';
import Typography from '../../components/common/Typography';
import './home.css';
import Event from '../../components/Event';
import EventCalendar from '../../components/EventCalendar';
import { useEffect, useState } from "react";
import { getEvents, searchEvents } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import EventModal from "../../components/CreateEventModal";
import Rates from '../../components/Rates';

export default function Home() {
    const navigate = useNavigate()

    const [events, setEvents] = useState([]);
    const [query, setQuery] = useState("")
    const [modal, setModal] = useState(false);


    const getAll = () => {
        getEvents()
            .then(data => setEvents(data))
            .catch(err => console.error(err))
    }

    useEffect(() => {
        getAll()
    }, [modal]);

    const search = () => {
        searchEvents(query)
            .then(data => setEvents(data))
            .catch(err => console.error(err))
    }

    const handleDayClick = (day) => {
        const event = events.find(event => new Date(event.date).toLocaleDateString() === day.toLocaleDateString()) //find event with same date
        if (event) navigate(`/event/${event.id}`) //navigate to event page
    }

    function handleModal(value) { setModal(value) }

    return (
        <div className={"right-hand-side"}>
            <div className={"title-bar"}>
                <div className={"page-title"}>
                    <Typography variant="h4" className='bold'>My Events</Typography>
                </div>
                <div className={"search"}>
                    <TextField
                        className="search-bar"
                        value={query}
                        placeholder={"Search by name or description"}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <div className="search-button">
                        <Button text="Search" onClick={search} />
                    </div>
                </div>
            </div>
            <div className='main-content'>
                <div className={"events"}>
                    {events?.map((event, index) => (
                        <Event
                            id={event.id}
                            key={index}
                            name={event.name}
                            guests={event.guests}
                            date={event.date}
                            status={event.confirmationStatus}
                            location={event.coordinates}
                            onClick={() => navigate(`/event/${event.id}`)}
                            refresh={getAll}
                        />
                    ))}
                </div>
                <div className='info'>
                <EventCalendar mode='multiple' events={events} onClick={handleDayClick} />
                <Rates/>
                </div>
            </div>
            <div className="button-container">
                <Button onClick={(e) => {
                    e.stopPropagation();
                    handleModal(true)
                }} className="rounded" size="lg" text="+" />
            </div>
            <EventModal show={modal} handleClose={() => handleModal(false)} />
        </div>
    )
}