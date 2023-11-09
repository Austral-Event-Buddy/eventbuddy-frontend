import React, { useState } from "react";
import TextField from '../common/TextField'
import { Box, Modal } from '@mui/material';
import Button from "../common/Button";
import Typography from "../common/Typography";
import './index.css';
import CloseIcon from '@mui/icons-material/Close';
import { createElement } from "../../api/api";

const modalContainerStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "500px",
    //height: "350px",
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

const ElementModal = ({ show, handleClose, eventId }) => {

    console.log(show)

    const [element, setElement] = useState({
        name: "",
        quantity: 0,
        maxUsers: 0,
        date: new Date().toISOString(),
        eventId,
    });

    const handleChange = async (form) => {
        setElement(prevEvent => ({ ...prevEvent, ...form }));
    }

    const closeModal = () => {
        setElement({
            name: "",
            quantity: 0,
            maxUsers: 0,
            date: new Date().toISOString(),
            eventId,
        })
        handleClose();
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            createElement(element).then(r => closeModal())

        } catch (e) {
            alert("Some error occurred. Please try again.");
        }
    }

    return (
        <div style={{ display: show ? "block" : "none" }}>
            <Box sx={modalContainerStyle}>
                <CloseIcon fontSize="large" style={closeIconStyle} onClick={closeModal} />
                <Typography id="modal-title" variant="h5" children="Create an Element" />
                <form id="modal-form" className="create-event-form" onSubmit={handleSubmit}>
                    <TextField label="Name" name="name" placeholder="name" value={element.name} onChange={(e) => handleChange({ name: e.target.value })} required />
                    <TextField label="Quantity" name="description" type="number" value={element.quantity} onChange={(e) => handleChange({ quantity: Number(e.target.value) })} required />
                    <TextField label="Assigned Limit" name="description" type="number" value={element.maxUsers} onChange={(e) => handleChange({ maxUsers: Number(e.target.value) })} required />
                    <Button variant="fullfilled" size="md" text="Create Element" />
                </form>
            </Box>
        </div>
    );
};

export default ElementModal;