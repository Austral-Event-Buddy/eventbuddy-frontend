import React, { useState } from "react";
import TextField from '../common/TextField'
import { Box, Modal } from '@mui/material';
import Button from "../common/Button";
import Typography from "../common/Typography";
import './index.css';
import CloseIcon from '@mui/icons-material/Close';
import { createComment } from "../../api/api";
import CommentThread from "../CommentThread";

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

const CommentModal = ({ show, handleClose, eventId, parent }) => {

    const [comment, setComment] = useState(undefined);

    const closeModal = () => {
        setComment("")
        handleClose();
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            createComment({ eventId, text: comment, parentId: parent?.id }).then(r => closeModal())
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div style={{ display: show ? "block" : "none" }}>
            <Box sx={modalContainerStyle}>
                <CloseIcon fontSize="large" style={closeIconStyle} onClick={closeModal} />
                <Typography id="modal-title" variant="h5" children="Create an Element" />
                <form id="modal-form" className="create-event-form" onSubmit={handleSubmit}>
                    { parent && <CommentThread comment={{...parent, replies: []}} /> }
                    <TextField label="Comment" name="comment" placeholder="comment" value={comment} onChange={(e) => setComment(e.target.value)} required type="multiline" />
                    <Button variant="fullfilled" size="md" text="Comment" disabled={!comment}/>
                </form>
            </Box>
        </div>
    );
};

export default CommentModal;