import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './static/style.css';

axios.defaults.withCredentials = true;


ReactDOM.render(
  <React.StrictMode>
    <ToastContainer position="top-right" progressClassName="toastProgress" autoClose={2000}/>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);