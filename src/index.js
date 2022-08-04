import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';

axios.defaults.baseURL = 'https://gorest.co.in';
axios.defaults.headers.common = {
    Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                limit={3}
            />
        </BrowserRouter>
    </React.StrictMode>,
);
