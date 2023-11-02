import React, {useState, useEffect, useRef, useCallback} from "react";
import TextField from '../common/TextField'
import {Box, Modal} from '@mui/material';
import Button from "../common/Button";
import Typography from "../common/Typography";
import './index.css';
import CloseIcon from '@mui/icons-material/Close';
import {createComment} from "../../api/api";

const modalContainerStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "500px",
    height: "300px",
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

const NewCommentModal = ({ show, handleClose, eventId }) => {

    const [search, setSearch] = useState("")

    const [comment, setComment] = useState({
        text: "",
        eventId: eventId,
        //parentId
    });

    const handleChange = async (form) => {
        const newEvent = { ...comment, ...form }
        await setComment(newEvent);
    }

    const closeModal = () => {
        setComment({
            text: "",
        })
        handleClose();
    }


    const handleSubmit = () => {
        try {
            createComment(comment).then(r => closeModal()) //todo: CHANGE
        } catch (e) {
            alert("Some error occurred. Please try again.");
        }
    }

    return (
        <div style={{display: show ? "block" : "none"}}>
            <Box sx={modalContainerStyle}>
                <CloseIcon fontSize="large" style={closeIconStyle} onClick={closeModal}/>
                <Typography id="modal-title" variant="h5" children="Comment" />
                <div className='inputs-container'>
                    <form id="modal-form" className={"modal"} >
                        <TextField multiline={true} rows={4} placeholder={"Type here..."} name="message" value={comment.message} className={"input"}
                                   onChange={(e) => handleChange({ message: e.target.value })} />
                    </form>
                </div>
                <div className="buttons-container">
                    <Button onClick={handleSubmit} variant="fullfilled" size="md" text="Create Element"/>
                </div>
            </Box>
        </div>
    );
};

export default NewCommentModal;