import React from 'react';
import { createRoot } from "react-dom/client";
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import App from './App';

import 'react-toastify/dist/ReactToastify.css';
import './static/style.css';

axios.defaults.withCredentials = true;

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastContainer position="top-right" progressClassName="toastProgress" autoClose={2000} />
    <App />
  </React.StrictMode>
)

