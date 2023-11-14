import React, { useEffect, useState } from "react";
import TextField from '../common/TextField'
import { Box, Modal } from '@mui/material';
import Button from "../common/Button";
import Typography from "../common/Typography";
import './index.css';
import CloseIcon from '@mui/icons-material/Close';
import { updateElement, deleteElement } from "../../api/api";

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

const ElementModal = ({ show, handleClose, eventId, element }) => {

    const [elementData, setElement] = useState(element);

    useEffect(() => {
        setElement(element)
    }, [element])

    const handleChange = async (form) => {
        setElement(prevEvent => ({ ...prevEvent, ...form }));
    }

    const closeModal = () => {
        setElement({
            name: "",
            quantity: 0,
            maxUsers: 0,
            eventId,
        })
        handleClose();
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const elem = elementData
        delete elem.users
        updateElement(elem).then(r => closeModal())
    }

    const handleDelete = (e) => {
        e.preventDefault()
        deleteElement(element.id).then(r => closeModal())
    }

    return (
        <div style={{ display: show ? "block" : "none" }}>
            <Box sx={modalContainerStyle}>
                <CloseIcon fontSize="large" style={closeIconStyle} onClick={closeModal} />
                <Typography id="modal-title" variant="h5" children="Edit Element" />
                <form id="modal-form" className="create-event-form">
                    <TextField label="Name" name="name" placeholder="name" value={elementData?.name} onChange={(e) => handleChange({ name: e.target.value })} required />
                    <TextField label="Quantity" name="description" type="number" value={elementData?.quantity} onChange={(e) => handleChange({ quantity: Number(e.target.value) })} required />
                    <TextField label="Assigned Limit" name="description" type="number" value={elementData?.maxUsers} onChange={(e) => handleChange({ maxUsers: Number(e.target.value) })} required />
                    <div className="buttons-container">
                        <Button variant="fullfilled" size="md" text="Edit Element" onClick={handleSubmit} />
                        <Button variant="outlined-error" size="md" text="Delete Element"  onClick={handleDelete}/>
                    </div>
                </form>
                
            </Box>
        </div>
    );
};

export default ElementModal;