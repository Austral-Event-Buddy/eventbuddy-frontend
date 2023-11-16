import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom"

import {
  getComments,
  getElementsByEvent,
  getEventById,
  getGuestsByEventId,
  getRepliesOfComment,
  getUserById
} from "../../api/api";

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

import ElementModal from "../../components/CreateElementModal";
import NewCommentModal from "../../components/NewCommentModal";

export default function EventPage() {
  const { id } = useParams();

  const [event, setEvent] = useState(undefined);
  const [guests, setGuests] = useState(undefined);
  const [elements, setElements] = useState(undefined);
  const [comments, setComments] = useState(undefined);
  const [replies, setReplies] = useState(undefined); // Array of arrays
  const [names, setNames] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateElementModalOpen, setIsCreateElementModalOpen] = useState(false)
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false)

  useEffect(() => {
    getEventById(id).then(e => {
      setEvent(e)
    })
    getGuestsByEventId(id).then(async e=>{
      setGuests(e)
      const guestNames = await Promise.all(
          e.map(async (guest) => await getName(guest.userId))
      );
      setNames(guestNames);
    })
    getElementsByEvent(id).then(e=>{
      setElements(e)
    })
    getComments(id).then( async e=>{
      setComments(e)
      const replies = await Promise.all(
          e.map(async (comment) => await getRepliesOfComment(comment.id))
      )
      setReplies(replies)
    }).catch((error) => {
      console.error('Error fetching comments:', error);
    });
  }, [isModalOpen, isCreateElementModalOpen])



  async function getName(userId) {
    return getUserById(userId).then((e) =>
      e.username
    );
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
              {/*{guests?.find(g => g.userId = getUser()).isHost && <Button text={'+'} variant="ghost" onClick={() => setIsCreateElementModalOpen(true)} />}*/}
              {event.isHost && <Button text={'+'} variant="ghost" onClick={() => setIsCreateElementModalOpen(true)} />}
            </div>

            {elements?.length
                ? elements.map((element) => (<Element key={element.id} element={element} host={event.isHost}/>))
                : <NoContent message={"There's no elements"} />
            }
            <div className="event-comments-header">
              <Typography variant="h5">Comments</Typography>
              <Button text={'+'} variant="ghost" onClick={() => setIsCommentModalOpen(true)}/>
            </div>
            {comments?.length
                ? comments?.map(comment => <CommentThread comment={comment} key={comment.id} replies={replies}/>)
                : <NoContent message={"There's no comments"} />
            }
          </section>
          <section className="event-body-right">
            <div className="right-header">
              <Typography variant={'h5'} className="bold">Guests</Typography>
              {guests?.map((guest, index) => (
                  <AvatarCard
                      status={guest.confirmationStatus}
                      name={names[index]}
                      url={'https://xsgames.co/randomusers/assets/avatars/male/31.jpg'}
                      key={guest.id}
                  />
              ))}
            </div>

            {event.isHost && <Button text={'Invite'} onClick={() => setIsModalOpen(true)} /> }
          </section>
        </div>
        <ModalComponent open={isModalOpen} onClose={() => setIsModalOpen(false)} guests={event.guests} eventId={event.id} />
        <ElementModal show={isCreateElementModalOpen} handleClose={() => setIsCreateElementModalOpen(false)} eventId={event.id} />
        <NewCommentModal show={isCommentModalOpen} handleClose={() => setIsCommentModalOpen(false)} eventId={event.id} />

      </div> :
      <div>Loading...</div>
}