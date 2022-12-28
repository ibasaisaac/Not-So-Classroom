import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { axiosJWT } from './header.js';
import ClubJoin from './join_club.js';

import '../static/clubmenu.css';
import us from '../static/us.png';


const Clubmenu = () => {
    const [user, setUser] = useState('')
    const [clubJoinPopUp, setClubJoinPopUp] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        const getUser = async () => {
            const token = ''
            await axiosJWT.get('http://localhost:5000/getuser', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(function (res1) {
                    setUser(res1.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }

        getUser()
    }, []);

    


    const clubButton = async (e) => {
        e.preventDefault()
        navigate('/club');
    }

    return (
        <div className="container-fluid cont">
            <img alt='' className="us" src={us} />

            <div className="container-fluid" style={{ fontFamily: 'marker' }}>
                <button className="button btn1" onClick={(e) => clubButton(e)}>IUT COMPUTER SOCIETY (IUTCS)</button>
                <button className="button btn7" onClick={() => setClubJoinPopUp(true)}>+</button>
            </div>
            {clubJoinPopUp && <ClubJoin setClubJoinPopUp={setClubJoinPopUp} setUser={user} />}
        </div>
    )
}

export default Clubmenu