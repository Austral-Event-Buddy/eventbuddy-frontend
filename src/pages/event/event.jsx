import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom"

import { getEventById, getEvents } from "../../api/api";

import Typography from "../../components/common/Typography";
import Map from "../../components/Event/map";
import AvatarCard from "../../components/AvatarCard";
import Button from "../../components/common/Button";
import ModalComponent from '../../components/InviteGuest';

import './event.css';
import { getCountDown } from "../../utils/date";
import CommentThread from "../../components/CommentThread";

export default function EventPage() {
    const { id } = useParams();

    const [event, setEvent] = useState(undefined);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setEvent({
            "id": 1,
            "name": "cumpleañito",
            "description": "Cumpleañito en la plaza",
            "coordinates": [
                40.758896,
                -73.985130
            ],
            "date": "2024-01-12T00:00:00.000Z",
            "confirmationDeadline": "2023-12-23T00:00:00.000Z",
            "confirmationStatus": "HOST",
            "guests": [{"name":"Juan", confirmationStatus: "ATTENDING", id:1}],
            "comments": [
                {
                  id: 1,
                  text: 'Este es un comentario principal',
                  author: "Juan",
                  replies: [
                    {
                      id: 2,
                      text: 'Respuesta al comentario principal',
                      author: "Pedro",
                      replies: [
                        {
                          id: 3,
                          text: 'Respuesta a la respuesta',
                          author: "Juan",
                          replies: []
                        }
                      ]
                    },
                    {
                      id: 4,
                      text: 'Otra respuesta al comentario principal',
                      author: "Luca",
                      replies: []
                    }
                  ]
                },
                {
                  id: 5,
                  text: 'Otro comentario principal sin respuestas',
                  author: "Pepe",
                  replies: []
                }
              ]
        })
        //getEventById(id).then(e => {   
        //    setEvent(e);
        //})
    } , [isModalOpen])

    
    
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
                <div className="event-comments-header">
                    <Typography variant="h5">Comments</Typography>
                    <Button text={'+'} variant="ghost"/>
                </div>
                {event.comments.map(comment => <CommentThread comment={comment} key={comment.id}/>)}
            </section>
            <section className="event-body-right">
                <div className="right-header">
                    <Typography variant={'h5'} className="bold">Guests</Typography>
                    {event.guests.map(guest => <AvatarCard status={guest.confirmationStatus} name={guest.name || guest.username} url={'https://xsgames.co/randomusers/assets/avatars/male/31.jpg'} key={guest.id} />)}
                </div>
                { event.id == 1 && <Button text={'Invite'} onClick={handleOpenModal}/>}
            </section>
        </div>
        <ModalComponent open={isModalOpen} onClose={handleCloseModal} guests={event.guests} eventId={event.id}/>;
    </div> : 
    <div>Loading...</div>
    }