import { useEffect, useState } from "react";
import StarRating from "../StarRating/StarRating";
import Button from "../common/Button";
import Typography from "../common/Typography";
import './styles.css';
import NoContent from "../NoContent";
import { getEvents, getPastEvents, getReviews } from "../../api/api";
import EventRate from "../EventRate";
import { getUser } from "../../utils/user";
export default function Rates() {
    const [myEvents, setMyEvents] = useState(false);
    const [events, setEvents] = useState([]);
    const eventsList = !myEvents
        ? events.filter(event => event.creatorId !== Number(getUser()))
        : events.filter(event => event.creatorId === Number(getUser()));

    useEffect(() => {
        getPastEvents(getUser()).then(res => {
            setEvents(res);
            console.log(res);
        });
    }, [])

    return (
        <div className="rates-container">
            <header className="rates-header">
                <Typography variant={'h6'} className="bold">Past Events</Typography>
                <div className="btn-container">
                    <Button
                        text={'Review'}
                        variant={!myEvents ? "fullfilled" : "ghost"}
                        size="sm"
                        className={!myEvents ? "active" : ""}
                        onClick={() => setMyEvents(false)}
                    />
                    <Button
                        text={'My events'}
                        variant={myEvents ? "fullfilled" : "ghost"}
                        size="sm"
                        className={myEvents ? "active" : ""}
                        onClick={() => setMyEvents(true)}
                    />
                </div>
            </header>
            {
                !!eventsList.length
                    ? eventsList.map(event => (
                        <EventRate key={event.id} id={event.id} name={event.name} baseRating={event.rating} />
                    ))
                    : myEvents
                        ? <NoContent message={"You don't have any past events"} style={{ height: 50 }} />
                        : <NoContent message={"No events to review"} style={{ height: 50 }} />
            }
        </div>
    )
}