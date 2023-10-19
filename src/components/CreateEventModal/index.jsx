import React, {useState, useEffect, useRef, useCallback} from "react";
import TextField from '../common/TextField'
import {Box, Modal} from '@mui/material';
import Button from "../common/Button";
import Typography from "../common/Typography";
import './index.css';
import { AddressAutofill } from '@mapbox/search-js-react';
import CloseIcon from '@mui/icons-material/Close';
import {createEvent} from "../../api/api";

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

const closeIconStyle = {
    marginLeft: "auto",
    color: "red",
    cursor: "pointer",
    float: "right",
    display: "inline",

}

const EventModal = ({ show, handleClose }) => {

    const [search, setSearch] = useState("")

    const [event, setEvent] = useState({
        name: "",
        location:[],
        description: "",
        date: "",
        confirmationDeadline: "",
    });

    const handleChange = async (form) => {
        const newEvent = { ...event, ...form }
        await setEvent(newEvent);
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


    const handleRetrieve = async (res)=> {
        const feature = res.features[0];
        const newEvent = { ...event, location: feature.geometry.coordinates }
        await setEvent(newEvent);
    }

    const handleSubmit = () => {
        try {
            createEvent(event).then(r => closeModal())

        } catch (e) {
            alert("Some error occurred. Please try again.");
        }
    }

    return (
        <div style={{display: show ? "block" : "none"}}>
            <Box sx={modalContainerStyle}>
                <CloseIcon fontSize="large" style={closeIconStyle} onClick={closeModal}/>
                <Typography id="modal-title" variant="h5" children="Create an Event" />
                <div className='inputs-container'>
                    <TextField label="Name" name="name" value={event.name}
                               onChange={(e) => handleChange({ name: e.target.value })}
                    />
                    <form id="modal-form">
                        <AddressAutofill accessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                                         onRetrieve={handleRetrieve}>
                            <TextField label="Location" name="location" value={search}
                                       onChange={(e) => setSearch(e.target.value)}/>
                        </AddressAutofill>
                        <TextField label={"Description"} name="description" value={event.description}
                                   onChange={(e) => handleChange({ description: e.target.value })}/>
                        <TextField label="Date" name="date" type="date" value={event.date}
                                   onChange={(e) => handleChange({ date: e.target.value })}/>
                        <TextField label="Confirmation Deadline" name="confirmationDeadline" type="date" value={event.confirmationDeadline}
                                   onChange={(e) => handleChange({ confirmationDeadline: e.target.value })}/>
                    </form>
                </div>
                <div className="button-container">
                    <Button onClick={handleSubmit} variant="fullfilled" size="md" text="Create Event"/>
                </div>
            </Box>
        </div>
    );
};

export default EventModal;