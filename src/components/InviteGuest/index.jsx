import React, {useEffect, useState} from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from "../common/Typography";
import Button from "../common/Button";
import './modal.css';
import { inviteGuest, searchUsers} from "../../api/api";
import TextField from '../common/TextField';
import AvatarCard from '../AvatarCard';

function ModalComponent({ open, onClose, guests, eventId }) {
    const [inputValue, setInputValue] = useState('');
    const [userList, setUserList] = useState([]);
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        if (inputValue !== '') searchUsers(inputValue)
            .then(data => setUserList(data.filter(user => !guests.find(guest => guest.id === user.id))))
            .catch(error => console.error(error));
    }, [inputValue]);

    const sendInvitation = () => {
        const invitationData = {
            userId: user.id,
            eventId,
        };

        inviteGuest(invitationData)
            .then((response) => {
                handleOnClose();
            })
            .catch((error) => {
                handleOnClose()
            });
    };

    const select = (user) => {
        console.log(user)
        setInputValue(user.username);
        setUser(user);
    }

    const handleOnClose = () => {
        setInputValue('');
        setUserList([]);
        onClose();
        setUser(undefined)
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
                    <TextField label="Username" value={inputValue} placeholder="jane_doe" onChange={(e) => setInputValue(e.target.value)} />
                    {
                        !!userList.length && !user &&  
                            <div className="user-list">
                                {
                                    userList.map((user, index) => (
                                        <div key={index} className="user">
                                            <AvatarCard name={user.name || user.username} url={'https://xsgames.co/randomusers/assets/avatars/male/31.jpg'} onClick={() => select(user)}/>
                                        </div>
                                    ))
                                }
                            </div>
                    }
                    <div className="buttons">
                        <Button className="button" text="Invite as a guest" onClick={() => sendInvitation("PENDING")} />
                    </div>
                </Box>
            </div>
        </Modal>
    );
}

export default ModalComponent;
