import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from "jwt-decode";

import '../static/header.css';
import logo from '../static/pencil.svg';

const Header = () => {
    const [username, setUsername] = useState(null);
    const [user, setUser] = useState('')
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
                axios.get('http://localhost:5000/getuser', {
                })
                    .then(function (res1) {
                        console.log('header', res1.data);
                        setUser(res1.data);
                    })
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


    const homeButton = async (e) => {
        e.preventDefault()
        history.push("./home");
    }
    const profileButton = async (e) => {
        e.preventDefault()
        history.push("./profile");
    }
    const groupButton = async (e) => {
        e.preventDefault()
        if (user.class_group) {
            history.push('./group');
        }
    }
    const clubButton = async (e) => {
        e.preventDefault()
        history.push('./clubmenu');
    }
    const shopButton = async (e) => {
        e.preventDefault()
        history.push("./shop");
    }
    const supportButton = async () => {
        history.push("./support");
    }

    if(user){
    return (
        <div className='sticky-top marker' style={{ backgroundColor: 'var(--crystal)' }}>
            <nav className="navbar">
                <div className="container-fluid">
                    <button type="button" style={{ backgroundColor: 'transparent', border: 'none' }} data-bs-toggle="offcanvas" data-bs-target="#offcanvasSidenav">
                        <i className="fa fa-solid fa-bars fa-xl" ></i>
                    </button>

                    <a href='/#' className="navbar-brand" onClick={homeButton}><img src={logo} alt="Logo" width="30" height="24" className="d-inline-block align-text-top" />Not So Classroom</a>
                    <div>
                        <label> {username}, &ensp; </label>
                        <button onClick={Logout} style={{ backgroundColor: 'transparent', border: 'none' }}>
                            <i className="fa fa-right-from-bracket fa-xl"></i>
                        </button>
                    </div>
                </div>
            </nav>

            <div className="offcanvas offcanvas-start" style={{ maxWidth: '25%', backgroundColor: 'var(--crystal)' }} data-bs-scroll="true" tabIndex="-1" id="offcanvasSidenav">

                <div className="offcanvas-header p-4" style={{ maxHeight: '45px' }}>
                    <h5 className="offcanvas-title">Ahoy there, {username}!</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
                </div>

                <div className="offcanvas-body" >
                    <div className="offcanvas-body comfortaa" >
                        <ul className="navbar-nav gap-2">
                            <li>
                                <button type="button" className="btn btn-light btn-block text-center" data-bs-dismiss="offcanvas" onClick={homeButton}>
                                    <a href='/#'>Home</a>
                                </button>
                            </li>
                            <li >
                                <button type="button" className="btn btn-light btn-block text-center" data-bs-dismiss="offcanvas" onClick={profileButton}>
                                    <a href='/#'>Profile</a>
                                </button>
                            </li>
                            <li>
                                <button type="button" className="btn btn-light btn-block text-center" data-bs-dismiss="offcanvas" onClick={groupButton}>
                                    <a href='/#'>Group</a>
                                </button>
                            </li>
                            <li>
                                <button type="button" className="btn btn-light btn-block text-center" data-bs-dismiss="offcanvas" onClick={clubButton}>
                                    <a href='/#'>Clubs</a>
                                </button>
                            </li>
                            <li >
                                <button type="button" className="btn btn-light btn-block text-center" data-bs-dismiss="offcanvas" onClick={shopButton}>
                                    <a href='/#'>Shop</a>
                                </button>
                            </li>
                            <li>
                                <button type="button" className="btn btn-light btn-block text-center" data-bs-dismiss="offcanvas" onClick={supportButton}>
                                    <a href='/#'>Support</a>
                                </button>
                            </li>

                            < div className="penguin" >
                                <div className="penguin-head">
                                    <div className="face left"></div>
                                    <div className="face right"></div>
                                    <div className="chin"></div>
                                    <div className="eye left">
                                        <div className="eye-lid"></div>
                                    </div>
                                    <div className="eye right">
                                        <div className="eye-lid"></div>
                                    </div>
                                    <div className="blush left"></div>
                                    <div className="blush right"></div>
                                    <div className="beak top"></div>
                                    <div className="beak bottom"></div>
                                </div>
                                <div className="shirt">
                                </div>
                                <div className="penguin-body">
                                    <div className="arm left"></div>
                                    <div className="arm right"></div>
                                    <div className="foot left"></div>
                                    <div className="foot right"></div>
                                </div>
                            </div >
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )}
}

export default Header

