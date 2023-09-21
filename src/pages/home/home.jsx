import TextField from '../../components/common/TextField';
import Button from '../../components/common/Button';
import Typography from '../../components/common/Typography';
import './home.css';
import Event from '../../components/Event';
import EventCalendar from '../../components/eventCalendar';
import { useEffect, useState } from "react";
import { getEvents } from "../../api/api";

export default function Home() {
    const eventsData = [
        {
            name: "Jane's Birthday Party",
            invitationAmount: 14,
            date: new Date('2023-09-15'),
            status: "ATTENDING",
            coordinates: [40.7128, -74.0060], // Nueva York, EE. UU.
        },
        {
            name: "Joe's Birthday Party",
            invitationAmount: 12,
            date: new Date('2023-09-03'),
            status: "ATTENDING",
            coordinates: [34.0522, -118.2437], // Los Ángeles, California, EE. UU.
        },
        {
            name: "Bob's Birthday Party",
            invitationAmount: 12,
            date: new Date('2023-09-03'),
            status: "ATTENDING",
            coordinates: [51.5074, -0.1278], // Londres, Reino Unido.
        },
        {
            name: "Frank's Birthday Party",
            invitationAmount: 12,
            date: new Date('2023-09-03'),
            status: "PENDING",
            coordinates: [48.8566, 2.3522], // París, Francia.
        },
        {
            name: "Sophie's Birthday Party",
            invitationAmount: 12,
            date: new Date('2023-09-03'),
            status: "NOT_ATTENDING",
            coordinates: [-33.8688, 151.2093], // Sídney, Australia.
        }
    ];

    const [events, setEvents] = useState([]);

    useEffect(() => {
        getEvents()
            .then((data) => {
                setEvents(data);
            })
            .catch((error) => {
                console.error('Error obtaining data from backend:', error);
            });
    }, []);

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
                <EventCalendar />
            </div>
        </div>
    )
}