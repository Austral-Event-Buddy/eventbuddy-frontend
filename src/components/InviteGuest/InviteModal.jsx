import React, {useEffect, useState} from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from "../common/Typography";
import Button from "../common/Button";
import './modal.css';
import {getAllUsers, inviteGuest} from "../../api/api";
import AutoComplete from "../common/AutoComplete";



function ModalComponent({ open, onClose, eventID}) {
    const [suggestedList, setSuggestedList] = useState([]);
    const [userList, setUserList] = useState([]);
    //const option = ["numa", "marco", "mau"]
    const [selectedName, setSelectedName] = useState('');


    useEffect(() => {
        getAllUsers()
            .then((data) => {
                setUserList(data);
            })
            .catch((error) => {
                console.error("Error obtaining data from backend:", error);
            });
    }, []);

    useEffect(() => {
        const filteredUsers = userList.filter((user) =>
            user.name.toLowerCase().includes(selectedName.toLowerCase())
        );
        setSuggestedList(filteredUsers);
    }, [selectedName, userList]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = {
            event: eventID,
            name: selectedName,
        };
        inviteGuest(form);
        handleOnClose()
    };

    const handleOnClose = () => {
        setSelectedName('');
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
                        Name
                        <div className="auto-complete">
                            <AutoComplete options = {suggestedList} placeholder ={"Jane Doe"} value={selectedName} onChange={(event, newValue) => {setSelectedName(newValue);}}/>
                        </div>
                    </label>
                    <div className="buttons-container">
                        <Button className="button" text="Invite as a guest" onClick={handleSubmit} />
                        <Button className="button" text="Invite as a host" onClick={onClose} variant={"outlined"}  style={{borderColor: "#E5493A", color: "#E5493A"}}/>
                    </div>
                </Box>
            </div>
        </Modal>
    );
}

export default ModalComponent;
