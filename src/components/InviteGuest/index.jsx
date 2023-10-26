import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from "../common/Typography";
import Button from "../common/Button";
import './modal.css';
import { inviteGuest, searchUsers } from "../../api/api";
import TextField from '../common/TextField';
import AvatarCard from '../AvatarCard';
import { Status } from '../../utils/status';

function ModalComponent({ open, onClose, guests, eventId }) {
    const [userList, setUserList] = useState([]);
    const [user, setUser] = useState(undefined);


    const handleChange = (event) => {
        const { value } = event.target;
        if (value === '') setUserList([])
        else searchUsers(value)
            .then(data => {
                setUserList(data.filter(user => guests.find(guest => guest.id !== user.id)))
            })
            .catch(error => console.error(error));
    }

    const sendInvitation = (status, host) => {
        const invitationData = {
            userId: user.id,
            isHost: host,
            eventId,
        };

        inviteGuest(invitationData)
            .then((response) => {
                onClose()
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const select = (user) => {
        setUserList([])
        setUser(user);
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div className="modal-box">
                <Box className="custom-box">
                    <Typography id="simple-modal-title" variant="h5" component="h2">
                        Invite
                    </Typography>
                    <div className='search-container'>
                        <TextField label="Username" placeholder="jane_doe" onChange={handleChange} />
                        {
                            !!userList.length &&
                            <div className="user-list">
                                {
                                    userList.map((user) => (
                                        <AvatarCard name={user.name || user.username} key={user.id} url={'https://xsgames.co/randomusers/assets/avatars/male/31.jpg'} onClick={() => select(user)} />
                                    ))
                                }
                            </div>
                        }
                    </div>
                    {
                        user && <AvatarCard name={user.name || user.username} url={'https://xsgames.co/randomusers/assets/avatars/male/31.jpg'} />
                    }
                    <div className="buttons">
                        <Button className="button" text="Invite as a guest" onClick={() => sendInvitation(Status.PENDING, false)} />
                        <Button className="button" text="Invite as a host" variant="outlined" onClick={() => sendInvitation(Status.PENDING, true)} />
                    </div>
                </Box>
            </div>
        </Modal>
    );
}

export default ModalComponent;
