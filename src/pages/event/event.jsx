import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom"

import { getEventById, getEvents } from "../../api/api";

import Typography from "../../components/common/Typography";
import Map from "../../components/Event/map";
import AvatarCard from "../../components/AvatarCard";
import Button from "../../components/common/Button";

import './event.css';
import { getCountDown } from "../../utils/date";

export default function EventPage() {
    const { id } = useParams();

    const [event, setEvent] = useState(undefined);

    useEffect(() => {
        getEventById(id).then(e => {   
            setEvent(e);
        })
    } , [])

    return event ? <div className='event-main'>
        <header className="event-header">
            <div className="event-title">
                <Typography variant="h4" className="bold">{event.name}</Typography>
                <Typography variant="body2">{getCountDown(event.date)}</Typography>
            </div>
        </header>
        <div className="event-body">
            <section className="event-body-left">
                <Typography variant="h5">Location</Typography>
                <Map location={event.coordinates} interactive={true} />
            </section>
            <section className="event-body-right">
                <div className="right-header">
                    <Typography variant={'h5'} className="bold">Guests</Typography>
                    {event.guests.map(guest => <AvatarCard status={guest.confirmationStatus} name={guest.name || guest.username} url={'https://xsgames.co/randomusers/assets/avatars/male/31.jpg'} />)}
                </div>
                <Button text={'Invite'}/>
            </section>
        </div>
    </div> : <div>Loading...</div>
    }