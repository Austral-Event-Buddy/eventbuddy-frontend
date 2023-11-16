import { useContext, useEffect, useState } from "react";
import StarRating from "../StarRating/StarRating";
import Button from "../common/Button";
import Typography from "../common/Typography";
import './styles.css';
import NoContent from "../NoContent";
import { getPastEvents } from "../../api/api";
import EventRate from "../EventRate";
import { UserContext } from "../../utils/user";
export default function Rates() {
    const user = useContext(UserContext);
    const [myEvents, setMyEvents] = useState(false);
    const [events, setEvents] = useState([]);
    const eventsList = !myEvents
        ? events.filter(event => event.creatorId !== Number(user?.id))
        : events.filter(event => event.creatorId === Number(user?.id));

    useEffect(() => {
        getPastEvents(user?.id).then(res => {
            setEvents(res);
        });
    }, [])

    const onClick = () => {
        getPastEvents(user?.id).then(res => {
            setEvents(res);
        });
    }

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
                        <EventRate key={event.id} id={event.id} name={event.name} baseRating={event.rating} readonly={myEvents} onClick={onClick}/>
                    ))
                    : myEvents
                        ? <NoContent message={"You don't have any past events"} style={{ height: 50 }} />
                        : <NoContent message={"No events to review"} style={{ height: 50 }} />
            }
        </div>
    )
}