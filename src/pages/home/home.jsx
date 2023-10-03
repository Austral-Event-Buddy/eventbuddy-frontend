import TextField from '../../components/common/TextField';
import Button from '../../components/common/Button';
import Typography from '../../components/common/Typography';
import './home.css';
import Event from '../../components/Event';
import EventCalendar from '../../components/eventCalendar';
import { useEffect, useState } from "react";
import { getEvents } from "../../api/api";
import { useNavigate } from 'react-router-dom';
import EventModal from "../../components/CreateEventModal";

export default function Home() {
    const navigate = useNavigate();

    const [events, setEvents] = useState([]);
    const [modal, setModal] = useState(false);


    useEffect(() => {
        getEvents()
            .then((data) => {
                setEvents(data);
            })
            .catch((error) => {
                console.error('Error obtaining data from backend:', error);
            });
    }, []);

    function handleDayClick(day){
        const event = events.find(event=>event.date.toLocaleDateString() === day.toLocaleDateString()) //find event with same date
        if(event){
            navigate(`/event/${event.id}`) //navigate to event page
        }
    }

    function handleModal(value) { setModal(value) }

    return (
        <div className={"right-hand-side"}>
            <div className={"title-bar"}>
                <div className={"page-title"}>
                    <Typography variant="h4" className='bold'>My Events</Typography>
                </div>
                <div className={"search"}>
                    <TextField className="search-bar" placeholder={"Search by name, description or invited people."} />
                    <div className="search-button">
                        <Button text="Search" />
                    </div>
                </div>
            </div>
            <div className='main-content'>
                <div className={"events"}>
                    {events.map((event, index) => (
                        <Event
                            key={index}
                            name={event.name}
                            invitationAmount={event.guests}
                            date={event.date}
                            status={event.confirmationStatus}
                            location={event.coordinates}
                        />
                    ))}
                </div>
                <EventCalendar mode='multiple' events={events?.map(event=>event.date)} onClick={handleDayClick}  />
            </div>
            <div className="footer">
                <div className="button-container">
                    <Button onClick={() => handleModal(true)} className="rounded" size="lg" text="+" />
                </div>
            </div>
            <EventModal show={modal} handleClose={() => handleModal(false)} />
        </div>
    )
}