import React, { useState, useEffect } from "react";
import TextField from '../common/TextField'
import {Box, Modal} from '@mui/material';
import Button from "../common/Button";
import Typography from "../common/Typography";
import './index.css';
import { AddressAutofill } from '@mapbox/search-js-react';

const modalContainerStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "500px",
    height: "620px",
    borderRadius: "24px",
    border: "1px solid var(--grey-grey-300, #BFBFBF)",
    backgroundColor: "#ffffff",
    boxShadow: "0px 0px 30px 0px rgba(0, 0, 0, 0.25)",
    padding: "36px",
};

const EventModal = ({ show, handleClose }) => {

    const token = process.env.REACT_APP_MAPBOX_TOKEN


    const [event, setEvent] = useState({
        name: "",
        location: "",
        description: "",
        date: "",
        confirmationDeadline: "",
    });

    const handleChange = (form) => {
        const newEvent = { ...event, ...form }
        setEvent(newEvent);
    }

    const closeModal = () => {
        setEvent({
            name: "",
            location: "",
            description: "",
            date: "",
            confirmationDeadline: ""
        })
        handleClose();
    }

    return (
        <Modal open={show} onClose={closeModal}>
            <Box sx={modalContainerStyle}>
                <Typography id="modal-title" variant="h5" children="Create an Event" />
                <div className='inputs-container'>
                    <TextField label="Name" name="name" value={event.name}
                               onChange={(e) => handleChange({ name: e.target.value })}/>
                    <form id="modal-form">
                        <AddressAutofill accessToken={token}>
                            <TextField label="Location" name="location" value={event.location}
                                       onChange={(e) => handleChange({ location: e.target.value })}/>
                        </AddressAutofill>
                    </form>
                    <TextField label={"Description"} name="description" value={event.description}
                               onChange={(e) => handleChange({ description: e.target.value })}/>
                    <TextField label="Date" name="date" type="date" value={event.date}
                               onChange={(e) => handleChange({ date: e.target.value })}/>
                    <TextField label="Confirmation Deadline" name="confirmationDeadline" type="date" value={event.confirmationDeadline}
                               onChange={(e) => handleChange({ confirmationDeadline: e.target.value })}/>
                </div>
                <div className="button-container">
                    <Button variant="fullfilled" size="md" text="Create Event"/>
                </div>
            </Box>
        </Modal>
    );
};

export default EventModal;