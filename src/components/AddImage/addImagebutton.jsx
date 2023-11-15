import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from "@mui/material";
import AddImage from "./index";

export default function AddImageButton({ image }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="add-image-button">
            <Button
                onClick={handleOpenModal}
                style={{
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    backgroundColor: '#D9D9D9',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: 'none',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {image && <img src={image} alt="profile picture" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />}
            </Button>
            <AddImage open={isModalOpen} onClose={handleCloseModal} />
        </div>
    );
}
