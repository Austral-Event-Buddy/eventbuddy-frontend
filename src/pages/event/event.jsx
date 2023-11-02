
import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom"

import {getElementsByEvent, getComments, getEventById} from "../../api/api";

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
import CreateElementModal from "../../components/CreateElementModal";
import EditElementModal from "../../components/EditElementModal";
import NewCommentModal from "../../components/NewCommentModal";

export default function EventPage() {
  const { id } = useParams();

  const [event, setEvent] = useState(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateElementModalOpen, setIsCreateElementModalOpen] = useState(false)
  const [isEditElementModalOpen, setIsEditElementModalOpen] = useState(false)
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [elements, setElements] = useState([])

    useEffect(async () => {
        await getEventById(id).then(e => {
            setEvent(e)
            // getComments(id).then(comments => setEvent({ ...event, comments })).catch(err =>  setEvent(event));
            setElements(e.elements)
            // getElementsByEvent(id).then(elements => {
            //     setElements(elements)
            // })
        })
    } , [isModalOpen])

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateElementModal = () => {
    setIsCreateElementModalOpen(!isCreateElementModalOpen)

  }

  function handleCommentModal(value) {setIsCommentModalOpen(value)}

  const handleEditElementModal = () => {
    setIsEditElementModalOpen(!isEditElementModalOpen)
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
        {/*<Map location={event.coordinates} interactive={true} />*/}
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
        <div className="event-comments-header">
          <Typography variant="h5">Comments</Typography>
          <Button text={'+'} variant="ghost" />
        </div>
        {event.comments?.length
          ? event.comments?.map(comment => <CommentThread comment={comment} key={comment.id} />)
          : <NoContent message={"There's no comments"} />
        }
      </section>
      <section className="event-body-right">
        <div className="right-header">
          <Typography variant={'h5'} className="bold">Guests</Typography>
          {event.guests?.map(guest => <AvatarCard status={guest.confirmationStatus} name={guest.name || guest.username} url={'https://xsgames.co/randomusers/assets/avatars/male/31.jpg'} key={guest.id} />)}
        </div>
        <Button text={'Invite'} onClick={handleOpenModal} />
        {/* TODO: Check if current user is host */}
      </section>
    </div>
    <CreateElementModal style={{"zIndex":'4'}} show={isCreateElementModalOpen} handleClose={() => handleCreateElementModal()} eventId={event.id}/>
    <EditElementModal style={{"zIndex":'4'}} show={isEditElementModalOpen} handleClose={() => handleEditElementModal()} />
    <NewCommentModal style={{"zIndex":'4'}} show={isCommentModalOpen} handleClose={() => handleCommentModal(false) } />
    {isModalOpen && <ModalComponent open={isModalOpen} onClose={handleCloseModal} guests={event.guests} eventId={event.id} />}
  </div> : <div>
    Loading...

  </div>
}