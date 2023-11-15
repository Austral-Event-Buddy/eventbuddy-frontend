
import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom"

import {assignElement, getEventById, unassignElement} from "../../api/api";

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

import CreateElementModal from "../../components/CreateElementModal";
import EditElementModal from "../../components/EditElementModal";
import CreateCommentModal from "../../components/CreateCommentModal";
import EditEventModal from "../../components/EditEventModal";

export default function EventPage() {
  const { id } = useParams();

  const [event, setEvent] = useState(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateElementModalOpen, setIsCreateElementModalOpen] = useState(false)
  const [isEditElementModalOpen, setIsEditElementModalOpen] = useState({
    open: false,
    element: undefined
  })
  const [isCreateCommentModalOpen, setIsCreateCommentModalOpen] = useState({
    open: false,
    parent: undefined
  })
  const [isEditEventModalOpen, setIsEditEventModalOpen] = useState(false)
  const [trigger, setTrigger] = useState(false)
  
  useEffect(() => {
      getEventById(id).then(e => {
        setEvent(e)
      })
  } , [isModalOpen, isCreateElementModalOpen, isEditElementModalOpen, isCreateCommentModalOpen, isEditEventModalOpen, trigger])

  const handleAssign = async (elementId) => {
    await assignElement({ elementId, date: new Date() })
    setTrigger((prev) => !prev)
  }

  const handleUnassign = async (elementId) => {
    await unassignElement({ elementId, date: new Date() })
    setTrigger((prev) => !prev)
  }

  const isHost = event?.guests?.find(g => g.userId === getUser())?.isHost

  return event ? <div className='event-main'>
    <header className="event-header">
      <div className="event-title">
        <Typography variant="h4" className="bold">{event.name}</Typography>
        <Typography variant="body2">{getCountDown(event.date)}</Typography>
      </div>
      <div>
        { isHost && <Button text={'Edit'} variant="ghost" onClick={() => setIsEditEventModalOpen(true)} /> }
      </div>
    </header>
    <div className="event-body">
      <section className="event-body-left">
        <Typography variant="h5">Location</Typography>
        <Map location={event.coordinates} interactive={true} />
        <div className="event-comments-header">
            <Typography variant="h5">Elements</Typography>
            { isHost && <Button text={'+'} variant="ghost" onClick={() => setIsCreateElementModalOpen(true)} />}
        </div>
        <div className="event-comments-body">
          {event.elements?.length 
            ? event.elements.map((element) => (
              <Element key={element.id} element={element} host={isHost} onAssign={() => handleAssign(element.id)} onUnassign={() => handleUnassign(element.id)} onEdit={() => setIsEditElementModalOpen({ open: true, element })} on/>
            ))
            : <NoContent message={"There's no elements"} />
          }
        </div>
        <div className="event-comments-header">
          <Typography variant="h5">Comments</Typography>
          { <Button text={'+'} variant="ghost" onClick={() => setIsCreateCommentModalOpen({ open: true })} /> }
        </div>
        <div>
          {event.comments?.length
            ? event.comments?.map(comment => <CommentThread comment={comment} key={comment.id} handleReply={(parent) => setIsCreateCommentModalOpen({ open: true, parent })}/>)
            : <NoContent message={"There's no comments"} />
          }
        </div>
      </section>
      <section className="event-body-right">
        <div className="right-header">
          <Typography variant={'h5'} className="bold">Guests</Typography>
          {event.guests?.map(guest => <AvatarCard status={guest.confirmationStatus} name={guest.user.name || guest.user.username} url={guest.profilePictureUrl} key={guest.id} />)}
        </div>
        { isHost && <Button text={'Invite'} onClick={() => setIsModalOpen(true)} /> }
      </section>
    </div>
    <ModalComponent open={isModalOpen} onClose={() => setIsModalOpen(false)} guests={event.guests} eventId={event.id} />
    <CreateElementModal show={isCreateElementModalOpen} handleClose={() => setIsCreateElementModalOpen(false)} eventId={event.id} />
    <EditElementModal show={isEditElementModalOpen.open} handleClose={() => setIsEditElementModalOpen({ open: false })} eventId={event.id} element={isEditElementModalOpen.element} />
    <CreateCommentModal show={isCreateCommentModalOpen.open} handleClose={() => setIsCreateCommentModalOpen({ open: false }) } eventId={event.id} parent={isCreateCommentModalOpen.parent} />
    <EditEventModal show={isEditEventModalOpen} handleClose={() => setIsEditEventModalOpen(false)} eventData={event} />
  </div> :
    <div>Loading...</div>
}