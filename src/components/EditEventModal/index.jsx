import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import TextField from '../common/TextField'
import { Box } from '@mui/material';
import Button from "../common/Button";
import Typography from "../common/Typography";
import './index.css';
import CloseIcon from '@mui/icons-material/Close';
import { editEvent, deleteEvent } from "../../api/api";

const modalContainerStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "500px",
    borderRadius: "24px",
    border: "1px solid var(--grey-grey-300, #BFBFBF)",
    backgroundColor: "#ffffff",
    boxShadow: "0px 0px 30px 0px rgba(0, 0, 0, 0.25)",
    padding: "36px",
    zIndex: 999,
};

const closeIconStyle = {
    marginLeft: "auto",
    color: "red",
    cursor: "pointer",
    float: "right",
    display: "inline",

}

const EventModal = ({ show, handleClose, eventData }) => {

    const navigate = useNavigate();

    const [event, setEvent] = useState({
        ...eventData,
        date: eventData?.date?.split("T")[0],
        confirmationDeadline: eventData?.confirmationDeadline?.split("T")[0],
    });

    const handleChange = async (form) => {
        setEvent(prevEvent => ({ ...prevEvent, ...form }));
    }

    const closeModal = () => {
        setEvent({
            name: "",
            description: "",
            date: "",
            confirmationDeadline: ""
        })
        handleClose();
    }

    useEffect(() => {
        setEvent({
            ...eventData,
            date: eventData?.date?.split("T")[0],
            confirmationDeadline: eventData?.confirmationDeadline?.split("T")[0],
        })
    }, [eventData, show])

    const handleSubmit = (e) => {
        e.preventDefault()
        const a = event;
        delete a.id
        delete a.creatorId
        delete a.createdAt
        delete a.updatedAt
        delete a.guests
        delete a.comments
        delete a.elements
        try {
            editEvent(eventData.id, {...event, date: new Date(event.date).toISOString(), confirmationDeadline: new Date(event.confirmationDeadline).toISOString()}).then(r => closeModal())
        } catch (e) {
            alert("Some error occurred. Please try again.");
        }
    }

    const handleDelete = (e) => {
        e.preventDefault()
        try {
            deleteEvent(eventData.id).then(r => navigate("/"))
        } catch (e) {
            alert("Some error occurred. Please try again.");
        }
    }

    const canSubmit = event.name && event.coordinates.length && event.description && event.date && event.confirmationDeadline && event.confirmationDeadline < event.date

    return (
        <div style={{ display: show ? "block" : "none" }}>
            <Box sx={modalContainerStyle}>
                <CloseIcon fontSize="large" style={closeIconStyle} onClick={closeModal} />
                <Typography id="modal-title" variant="h5" children="Create an Event" />
                <form id="modal-form" className="create-event-form">
                    <TextField label="Name" name="name" value={event.name} onChange={(e) => handleChange({ name: e.target.value })} required />
                    <TextField label={"Description"} name="description" value={event.description}
                        onChange={(e) => handleChange({ description: e.target.value })} required />
                    <TextField label="Date" name="date" type="date" value={event.date}
                        onChange={(e) => handleChange({ date: e.target.value })} required />
                    <TextField label="Confirmation Deadline" name="confirmationDeadline" type="date" value={event.confirmationDeadline}
                        error={event.confirmationDeadline > event.date} helperText={event.confirmationDeadline > event.date ?? "date should be before event date"}
                        onChange={(e) => handleChange({ confirmationDeadline: e.target.value })} required />
                    <div className="buttons-container">
                        <Button variant="fullfilled" size="md" text="Edit Event" onClick={handleSubmit} disabled={!canSubmit}/>
                        <Button variant="outlined-error" size="md" text="Delete Event" onClick={handleDelete}/>
                    </div>
                </form>
            </Box>
        </div>
    );
};

export default EventModal;