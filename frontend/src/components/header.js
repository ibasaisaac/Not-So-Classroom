import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';

import Hamburger from './hamburger'
import '../static/header.css';
import logo from '../static/pencil.svg';

const Header = () => {
    const [username, setUsername] = useState(null);
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const history = useHistory();

    useEffect(() => {
        refreshToken();
    }, []);


    const refreshToken = async () => {
        axios.get('http://localhost:5000/token')
            .then((response) => {
                setToken(response.data.accessToken);
                const decoded = jwt_decode(response.data.accessToken);
                setUsername(decoded.username);
                setExpire(decoded.exp);
                toast.success("Welcome back, " + decoded.username + "!");
            })
            .catch(error => {
                if (error.response) {
                    history.push("./login");
                }
            })
    }

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('http://localhost:5000/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setUsername(decoded.username);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    
    const Logout = async () => {
        try {
            await axios.delete('http://localhost:5000/logout');
            history.push("./login");
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div >
            <div className='outer marker' >

                <h3 className="innerMiddle"> <img src={logo} width="24" height="24" alt="logo" />Not So Classroom</h3>

                <div className='innerRight'>
                    <label> {username}, &ensp; </label>
                    <button onClick={Logout} style={{ backgroundColor: 'transparent', border: 'none' }}>
                        <i className="fa fa-right-from-bracket fa-xl"></i>
                    </button>
                </div>
            </div>

            {/* <ToastContainer position="top-right" progressClassName="toastProgress" /> */}
            <Hamburger/>
        </div>
    )
}

export default Header

