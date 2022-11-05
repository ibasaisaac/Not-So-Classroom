import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../static/home.css';
import kids from '../static/homekids.svg';
import bag from '../static/backpack.svg';
import paint from '../static/palette.svg';
import shop from '../static/shopping.svg';
import snakepost from '../static/snake.png';
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
        <div class="container-fluid wh">
            <img src={kids} class="k"/>
            <h6>{username}</h6>
            {/* <div>
                <button onClick={Logout} >
                    <FontAwesomeIcon icon="fa-sharp fa-solid fa-right-from-bracket" /> Log Out
                </button>
            </div> */}
            <div class="d-grid gap-2 col-6 ms-auto butpos">
                <button class="btn btn-light btn-sm shop" type="button" style={{ fontFamily: 'marker' }}>
                <img src={shop} width="30" height="30" alt="logo" />Shop</button>
                <button class="btn btn-light btn-sm group" type="button" style={{ fontFamily: 'marker' }}>
                <img src={bag} width="30" height="30" alt="logo" />Class Group</button>
                <button class="btn btn-light btn-sm club" type="button" style={{ fontFamily: 'marker' }}>
                <img src={paint} width="30" height="30" alt="logo" /> Clubs</button>
            </div>

            <div class="container-fluid main-content">

                {/* create post */}
                <div class="create-post-container">
                    <div class="col-auto">
                            <textarea row="3" class="form-control" 
                            id="create-post" placeholder="Whats on your mind?"></textarea>
                    </div>
                    <div class="add-post-links">
                            <a href="#"><i className="fa-solid fa-image"></i>Add Photo</a> 
                            <a style={{paddingLeft: 15}} href="#"><i className="fa-solid fa-paperclip"></i>Attach File</a>         
                    </div>
                    <div class="col-auto">
                        <button type="submit" class="btn btn-info"disabled>Post</button>
                    </div>
                </div>

                {/* feed */}
                <div class="card feed">
                    <div class="card-body">
                        <h4 class="card-title">@190041223</h4>
                        <small>Gazipur, 6h</small>
                        <p className="card-text">Snake in iut.</p>
                        <img src={snakepost} className="card-img-bottom feed-img" alt="Card image" />
                        <p>
                            <a href="#"><i className="fa-regular fa-comment"></i>Add Comment</a>
                        </p>
                    </div>
                </div>

            </div>
        </div >
    )
}

export default Home