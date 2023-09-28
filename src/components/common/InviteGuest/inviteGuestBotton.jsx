import React, { useState } from 'react';
import Button from '../Button/index';
import ModalComponent from './InviteModal';

export default function InviteGuestButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="invite-button">
            <Button onClick={handleOpenModal} text="Invite" />
            <ModalComponent open={isModalOpen} onClose={handleCloseModal} />
        </div>
    );
}
