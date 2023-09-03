import React from 'react';
import { ToastContainer } from 'react-toastify';
import './toastify.css'

export default function ToastError() {
    return (
        <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            theme="light"
        />
    );
}
