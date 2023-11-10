import React, {useEffect, useState} from 'react';
import EditIcon from '@mui/icons-material/Edit';
import AddImage from "./index";
import {Button} from "@mui/material";
import {getImage} from "../../api/api";

export default function AddImageButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [image, setImage] = useState(null);
    // useEffect(() => {
    //     getImage()
    //         .then((data) => {
    //             setImage(data);
    //         })
    //         .catch((error) => {
    //             console.error("Error obtaining data from backend:", error);
    //         });
    // }, []);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };


    return (
        <div className="add-image-button">
            {/*{image ? (*/}
            {/*    <Button*/}
            {/*        onClick={handleOpenModal}*/}
            {/*        style={{*/}
            {/*            width: '200px',*/}
            {/*            height: '200px',*/}
            {/*            borderRadius: '50%',*/}
            {/*            backgroundColor: '#D9D9D9',*/}
            {/*            display: 'flex',*/}
            {/*            justifyContent: 'center',*/}
            {/*            alignItems: 'center',*/}
            {/*            border: 'none',*/}
            {/*            cursor: 'pointer',*/}
            {/*        }}*/}
            {/*    >*/}
            {/*        <img src={URL.createObjectURL(image)} alt="Selected" style={{ width: '100%', height: '100%' }} />*/}
            {/*    </Button>*/}
            {/*) : }*/}
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
                    }}
                >
                    <EditIcon style={{ fontSize: '48px', color: 'black' }} />
                </Button>
            )}
            <AddImage open={isModalOpen} onClose={handleCloseModal} />
        </div>
    );
}
