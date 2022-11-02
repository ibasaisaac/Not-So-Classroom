import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../static/home.css';
import logo from '../static/pencil.svg';
import bag from '../static/backpack.svg';
import paint from '../static/palette.svg';
import shop from '../static/shopping.svg';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom';

const Home = () => {
    const [username, setName] = useState('null');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const history = useHistory();

    useEffect(() => {
        refreshToken();
    }, []);

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.username);
            setExpire(decoded.exp);
        } catch (error) {
            if (error.response) {
                history.push("/");
            }
        }
    }

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('http://localhost:5000/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.username);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    const Logout = async () => {
        try {
            await axios.delete('http://localhost:5000/logout');
            history.push("/");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container-fluid bg2">
            <h3 className="mb-3 text-center" style={{ fontFamily: 'marker' }}> <img src={logo} width="30" height="30" alt="logo" />Not So Classroom</h3>
            <h6>{username}</h6>
            <div>
                <button onClick={Logout} >
                    <FontAwesomeIcon icon="fa-sharp fa-solid fa-right-from-bracket" /> Log Out
                </button>
            </div>

            <div className="row justify-content-around mb-3" style={{ width: '150px', display: 'block' }}>
                <div className="col-lg-4" >
                    <div className="card-deck" style={{ width: '150px' }}>
                        <div className="card" >
                            <div className="card-body text-center" style={{ backgroundColor: 'var(--caramel)' }}>
                                <p className="card-text"><img src={bag} width="30" height="30" alt="logo" /><a href="#" className="card-link">Group</a></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="card-deck" style={{ width: '150px' }}>
                        <div className="card">
                            <div className="card-body text-center" style={{ backgroundColor: 'var(--vista)' }}>
                                <p className="card-text"><img src={paint} width="30" height="30" alt="logo" /><a href="#" className="card-link">Clubs</a></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="card-deck" style={{ width: '150px' }}>
                        <div className="card">
                            <div className="card-body text-center" style={{ backgroundColor: 'var(--melon)' }}>
                                <p className="card-text"><img src={shop} width="30" height="30" alt="logo" /><a href="#" className="card-link">Shop</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Home