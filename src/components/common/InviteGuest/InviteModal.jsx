import React, {useEffect, useState} from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from "../Typography";
import Button from "../Button";
import './modal.css';
import {getAllUsers, inviteGuest} from "../../../api/api";

function ModalComponent({ open, onClose }) {
    const [inputValue, setInputValue] = useState('');
    const [suggestedList, setSuggestedList] = useState([]);
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        getAllUsers()
            .then ((data) => {
            setUserList(data);
        })
            .catch((error) => {
            console.error("Error obtaining data from backend:", error);
        });
    }, []);

    useEffect(() => {
        const filteredUsers = userList.filter((user) =>
            user.name.toLowerCase().includes(inputValue.toLowerCase())
        );
        setSuggestedList(filteredUsers);
    }, [inputValue, userList]);

    const sendInvitation = () => {
        const invitationData = {
            name: inputValue,
        };

        inviteGuest(invitationData)
            .then((response) => {
                console.log('Invitation sent:', response);
                handleOnClose();
            })
            .catch((error) => {
                console.error('Error sending invitation:', error);
                handleOnClose()
            });
    };

    const handleOnClose = () => {
        setInputValue('');
        onClose();
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
                    <Typography id="simple-modal-title" variant="h6" component="h2">
                        Invite
                    </Typography>
                    <label>
                        <span className="label-text">Name:</span>
                        <input className="custom-input" placeholder="Jane Doe" type="text" name="name" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                        {/*<div className="suggested-list">
    <ul>
        {suggestedList.map((user) => (
            <li key={user.id}>{user.name}</li>
        ))}
    </ul>
</div>*/}
                    </label>
                    <div className="buttons-container">
                        <Button className="button" text="Invite as a guest" onClick={sendInvitation} />
                        <Button className="button" text="Invite as a host" onClick={onClose} variant={"outlined"}  style={{borderColor: "#E5493A", color: "#E5493A"}}/>
                    </div>
                </Box>
            </div>
        </Modal>
    );
}

export default ModalComponent;
