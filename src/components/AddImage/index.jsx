import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '../common/Typography';
import Button from '../common/Button';
import './index.css';
import {deleteImage, uploadImage} from '../../api/api';
import LinearProgress from '@mui/material/LinearProgress';

function AddImage({ open, onClose }) {
    const [image, setImage] = useState(null);
    const [formData, setFormData] = useState(new FormData());

    const handleImageDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];

        if (isJpgFile(droppedFile)) {
            setFormData((prevFormData) => {
                const newFormData = new FormData();
                newFormData.append('image', droppedFile);
                return newFormData;
            });
            setImage(droppedFile);
        } else {
            alert('Solo se permiten archivos jpg.');
        }
    };
    const isJpgFile = (file) => {
        return file.type === 'image/jpeg';
    };
    const handleDelete = (e) => {
        e.preventDefault();
        deleteImage();
        setImage(null);
    };

    const handleOnClose = () => {
        onClose();
        setImage(null);
    };


    const handleImageDragOver = (e) => {
        e.preventDefault();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (image) {
            uploadImage(formData)
                .then((response) => {
                    console.log(response);
                    setFormData(new FormData());
                })
                .catch((error) => {
                    console.error("Error uploading image:", error);
                });
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleOnClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div className="modal-box">
                <Box className="custom-box">
                    <Typography id="simple-modal-title" variant="h5" component="h2">
                        Update Profile Image
                    </Typography>
                    {image ? (
                        <div className="loading-image">
                                <img className="image-uploading" src={URL.createObjectURL(image)} alt="Selected" />
                            <div className="loading-progress">
                                    <div className="loading-bar" style={{ width: `200px`, height: '30px' }}>
                                        <LinearProgress />
                                    </div>
                            </div>
                            <div className="delete-button">
                                <Button onClick={handleDelete} size= "sm" variant={"outlined"} text = "Delete" className='red-button'/>
                            </div>
                        </div>
                    ) : (
                        <div
                            className={`file-drop-area ${image ? 'no-arrow' : ''}`}
                            onDrop={handleImageDrop}
                            onDragOver={handleImageDragOver}
                        >
                            <p>Drop here</p>
                        </div>
                    )}
                    <div className="buttons-container">
                        <Button
                            className="button"
                            text="Update"
                            onClick={handleSubmit}
                            fullWidth={true}
                        />
                    </div>
                </Box>
            </div>
        </Modal>
    );
}

export default AddImage;
