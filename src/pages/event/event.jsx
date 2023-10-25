
import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom"

import { getEventById } from "../../api/api";

import Typography from "../../components/common/Typography";
import Map from "../../components/Event/map";
import AvatarCard from "../../components/AvatarCard";
import Button from "../../components/common/Button";
import ModalComponent from '../../components/InviteGuest';

import './event.css';
import { getCountDown } from "../../utils/date";

export default function EventPage() {
    const { id } = useParams();

    const [event, setEvent] = useState(undefined);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        getEventById(id).then(e => {
            setEvent(e);
        })
    }, [isModalOpen, id])

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

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
                    {event.guests.map(guest => <AvatarCard status={guest.confirmationStatus} name={guest.name || guest.username} url={'https://xsgames.co/randomusers/assets/avatars/male/31.jpg'} key={guest.id} />)}
                </div>
                <Button text={'Invite'} onClick={handleOpenModal} />
                {/* TODO: Check if current user is host */}
            </section>
        </div>
        {isModalOpen && <ModalComponent open={isModalOpen} onClose={handleCloseModal} guests={event.guests} eventId={event.id} />}
    </div> : <div>Loading...</div>
}