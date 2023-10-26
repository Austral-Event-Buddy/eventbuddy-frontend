import React, {useState, useEffect, useRef, useCallback} from "react";
import TextField from '../common/TextField'
import {Box, Modal} from '@mui/material';
import Button from "../common/Button";
import Typography from "../common/Typography";
import './index.css';
import CloseIcon from '@mui/icons-material/Close';
import {createElement} from "../../api/api";

const modalContainerStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "500px",
    height: "350px",
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

const CreateElementModal = ({ show, handleClose, eventId }) => {

    const [search, setSearch] = useState("")

    const [element, setElement] = useState({
        name: 0,
        quantity: 0,
        maxUsers: 0,
        eventId: eventId,
        date: "2023-10-25T05:58:30.996Z"
    });

    const handleChange = async (form) => {
        const newEvent = { ...element, ...form }
        await setElement(newEvent);
    }

    const closeModal = () => {
        setElement({
            name: 0,
            quantity: 0,
            maxUsers: 0
        })
        handleClose();
    }


    const handleSubmit = () => {
        try {
            createElement(element).then(r => closeModal())
        } catch (e) {
            alert("Some error occurred. Please try again.");
        }
    }

    return (
        <div style={{display: show ? "block" : "none"}}>
            <Box sx={modalContainerStyle}>
                <CloseIcon fontSize="large" style={closeIconStyle} onClick={closeModal}/>
                <Typography id="modal-title" variant="h5" children="Create an Element" />
                <div className='inputs-container'>
                    <form id="modal-form" className={"modal"} >
                        <TextField label="Name" name="name" value={element.name} className={"input"}
                                   onChange={(e) => handleChange({ name: e.target.value })} />
                        <div className={"flex-input"}>
                            <TextField label="Quantity" name="quantity"  value={element.quantity} className={"input"}
                                       onChange={(e) => handleChange({ quantity: parseInt(e.target.value)})}/>
                            <TextField label="Assigned Limit" name="assignedLimit" value={element.maxUsers} className={"input"}
                                       onChange={(e) => handleChange({ maxUsers: parseInt(e.target.value)})}/>
                        </div>
                    </form>
                </div>
                <div className="button-container">
                    <Button onClick={handleSubmit} variant="fullfilled" size="md" text="Create Element"/>
                </div>
            </Box>
        </div>
    );
};

export default CreateElementModal;