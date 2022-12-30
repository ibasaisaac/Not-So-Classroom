import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from "jwt-decode";

import '../static/header.css';
import logo from '../static/pencil.svg';

export const axiosJWT = axios.create();


const Header = () => {
    const [username, setUsername] = useState(null);
    const [user, setUser] = useState('')
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const navigate = useNavigate();

    useEffect(() => {

        const refreshToken = async () => {
            axios.get('http://localhost:5000/token')
                .then((response) => {
                    setToken(response.data.accessToken);
                    const decoded = jwt_decode(response.data.accessToken);
                    setUsername(decoded.username);
                    setExpire(decoded.exp);
                    axiosJWT.get('http://localhost:5000/getuser', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                        .then(function (res) {
                            setUser(res.data)
                        })
                })
                .catch(error => {
                    if (error.response) {
                        navigate("/login");
                    }
                })
        }

        refreshToken();
    }, [navigate, token]);



    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('http://localhost:5000/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });


    const Logout = async () => {
        try {
            await axios.delete('http://localhost:5000/logout');
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    }


    const homeButton = async (e) => {
        e.preventDefault()
        navigate("/home");
    }
    const profileButton = async (e) => {
        e.preventDefault()
        navigate("/profile");
    }
    const groupButton = async (e) => {
        e.preventDefault()
        if (user.class_group) {
            navigate('/group');
        }
    }
    const clubButton = async (e) => {
        e.preventDefault()
        navigate('/clubmenu');
    }
    const shopButton = async (e) => {
        e.preventDefault()
        navigate("/shop");
    }
    const supportButton = async () => {
        navigate("/support");
    }

    return (
        <div className='sticky-top marker' style={{ backgroundColor: 'var(--crystal)' }}>
            <nav className="navbar">
                <div className="container-fluid">
                    <button type="button" style={{ backgroundColor: 'transparent', border: 'none' }} data-bs-toggle="offcanvas" data-bs-target="#offcanvasSidenav">
                        <i className="fa fa-solid fa-bars fa-xl" ></i>
                    </button>

                    <button style={{ backgroundColor: 'transparent', border: '0' }} className="navbar-brand" onClick={homeButton}><img src={logo} alt="Logo" width="30" height="24" className="d-inline-block align-text-top" />Not So Classroom</button>
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
                                    <button style={{ backgroundColor: 'transparent', border: '0' }}>Home</button>
                                </button>
                            </li>
                            <li >
                                <button type="button" className="btn btn-light btn-block text-center" data-bs-dismiss="offcanvas" onClick={profileButton}>
                                    <button style={{ backgroundColor: 'transparent', border: '0' }}>Profile</button>
                                </button>
                            </li>
                            <li>
                                <button type="button" className="btn btn-light btn-block text-center" data-bs-dismiss="offcanvas" onClick={groupButton}>
                                    <button style={{ backgroundColor: 'transparent', border: '0' }}>Group</button>
                                </button>
                            </li>
                            <li>
                                <button type="button" className="btn btn-light btn-block text-center" data-bs-dismiss="offcanvas" onClick={clubButton}>
                                    <button style={{ backgroundColor: 'transparent', border: '0' }}>Clubs</button>
                                </button>
                            </li>
                            <li >
                                <button type="button" className="btn btn-light btn-block text-center" data-bs-dismiss="offcanvas" onClick={shopButton}>
                                    <button style={{ backgroundColor: 'transparent', border: '0' }}>Shop</button>
                                </button>
                            </li>
                            <li>
                                <button type="button" className="btn btn-light btn-block text-center" data-bs-dismiss="offcanvas" onClick={supportButton}>
                                    <button style={{ backgroundColor: 'transparent', border: '0' }}>Support</button>
                                </button>
                            </li>

                            < div className="penguin" >
                                <div className="penguin-head">
                                    <div className="face leftt"></div>
                                    <div className="face rightt"></div>
                                    <div className="chin"></div>
                                    <div className="eye leftt">
                                        <div className="eye-lid"></div>
                                    </div>
                                    <div className="eye rightt">
                                        <div className="eye-lid"></div>
                                    </div>
                                    <div className="blush leftt"></div>
                                    <div className="blush rightt"></div>
                                    <div className="beak top"></div>
                                    <div className="beak bottom"></div>
                                </div>
                                <div className="shirt">
                                </div>
                                <div className="penguin-body">
                                    <div className="arm leftt"></div>
                                    <div className="arm rightt"></div>
                                    <div className="foot leftt"></div>
                                    <div className="foot rightt"></div>
                                </div>
                            </div >
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header

