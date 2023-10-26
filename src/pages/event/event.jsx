
import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom"

import {getElementsByEvent, getEventById} from "../../api/api";

import Typography from "../../components/common/Typography";
import Map from "../../components/Event/map";
import AvatarCard from "../../components/AvatarCard";
import Button from "../../components/common/Button";
import ModalComponent from '../../components/InviteGuest';

import './event.css';
import { getCountDown } from "../../utils/date";
import Element from "../../components/Element";

export default function EventPage() {
    const { id } = useParams();

    const [event, setEvent] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isCreateElementModalOpen, setIsCreateElementModalOpen] = useState(false)

    const coordinates = [42.6977, 23.3219]
    const [elements, setElements] = useState([])

    useEffect(() => {
        getEventById(id).then(e => {
            setEvent(e);
        })
        getElementsByEvent(id).then(e => {
            setElements(e)
        })
    } , [isModalOpen])

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    
    const handleCreateElementModal = () => {
      setIsCreateElementModalOpen(true)
    }

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
                <Map location={coordinates} interactive={true} />
                <div className="elements-container">
                    {elements &&
                        <div>
                            <div className="title-container">
                                <Typography variant="body1bold">Elements</Typography>
                                <p onClick={handleCreateElementModal} className="plusContainer">+</p>
                            </div>
                            {elements && elements.map((element) => (
                                <Element key={element.id} element={element} host={event.isHost}/>
                            ))}
                        </div>
                    }
                </div>
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