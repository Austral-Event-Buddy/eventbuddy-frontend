
import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom"

import {getEventById, getGuestsByEventId, getUserById} from "../../api/api";

import Typography from "../../components/common/Typography";
import Map from "../../components/Event/map";
import AvatarCard from "../../components/AvatarCard";
import Button from "../../components/common/Button";
import ModalComponent from '../../components/InviteGuest';

import './event.css';
import { getCountDown } from "../../utils/date";
import CommentThread from "../../components/CommentThread";
import NoContent from "../../components/NoContent";
import Element from "../../components/Element";

import { getUser } from "../../utils/user";
import ElementModal from "../../components/CreateElementModal";
import NewCommentModal from "../../components/NewCommentModal";

export default function EventPage() {
  const { id } = useParams();

  const [event, setEvent] = useState(undefined);
  const [guests, setGuests] = useState(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateElementModalOpen, setIsCreateElementModalOpen] = useState(false)
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false)

  useEffect(() => {
    getEventById(id).then(e => {
      setEvent(e)
    })
      getGuestsByEventId(id).then(e=>{
        setGuests(e)
        console.log(e.find((g) => g.userId = getUser()));
        //console.log(getUser())
      })
  } , [isModalOpen, isCreateElementModalOpen])

  // console.log(isCreateElementModalOpen)
  // console.log(guests?.find(g => g.userId === getUser() && g.isHost))


  function getName(userId) {
    return getUserById(userId).name;
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
            <Map location={event.coordinates} interactive={true} />
            <div className="event-comments-header">
              <Typography variant="h5">Elements</Typography>
              {guests?.find(g => g.userId = getUser()) && <Button text={'+'} variant="ghost" onClick={() => setIsCreateElementModalOpen(true)} />}
            </div>
            {event.elements?.length
                ? event.elements.map((element) => (<Element key={element.id} element={element} host={event.isHost}/>))
                : <NoContent message={"There's no elements"} />
            }
            <div className="event-comments-header">
              <Typography variant="h5">Comments</Typography>
              <Button text={'+'} variant="ghost" onClick={() => setIsCommentModalOpen(true)}/>
            </div>
            {event.comments?.length
                ? event.comments?.map(comment => <CommentThread comment={comment} key={comment.id} />)
                : <NoContent message={"There's no comments"} />
            }
          </section>
          <section className="event-body-right">
            <div className="right-header">
              <Typography variant={'h5'} className="bold">Guests</Typography>
              {guests?.map(guest => <AvatarCard status={guest.confirmationStatus} name={getName(guest.userId)} url={'https://xsgames.co/randomusers/assets/avatars/male/31.jpg'} key={guest.id} />)}
            </div>
            { guests?.find(g => g.userId = getUser() && g.isHost=== true) && <Button text={'Invite'} onClick={() => setIsModalOpen(true)} /> }
          </section>
        </div>
        <ModalComponent open={isModalOpen} onClose={() => setIsModalOpen(false)} guests={event.guests} eventId={event.id} />
        <ElementModal show={isCreateElementModalOpen} handleClose={() => setIsCreateElementModalOpen(false)} eventId={event.id} />
        <NewCommentModal show={isCommentModalOpen} handleClose={() => setIsCommentModalOpen(false)} eventId={event.id} />

      </div> :
      <div>Loading...</div>
}