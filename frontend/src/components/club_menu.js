import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { axiosJWT } from './header.js';
import ClubJoin from './join_club.js';
import ClubCreate from './create_club.js';

import '../static/clubmenu.css';
import clubkids from '../static/clubkids.svg';


const Clubmenu = () => {
    const [user, setUser] = useState('')
    const [clubs, setClubs] = useState('')
    const [clubJoinPopUp, setClubJoinPopUp] = useState(false);
    const [clubCreatePopUp, setClubCreatePopUp] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        const prepareMenuPage = async () => {
            const token = ''
            await axiosJWT.get('http://localhost:5000/getuser', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(function (res1) {
                    setUser(res1.data);
                    axios.post('http://localhost:5000/getclubs', {
                        student_id: res1.data.student_id
                    })
                        .then(function (res2) {
                            console.log('clubs', res2.data)
                            setClubs(res2.data);
                        })
                })
                .catch(error => {
                    console.log(error);
                });
        }

        prepareMenuPage()
    }, []);



    const clubButton = async (e, club) => {
        e.preventDefault()
        navigate('/club', { state: { club } });
    }

    if (!user || !clubs)
    return <div style={{ textAlign: 'center', lineHeight: '600px' }}><i className="fa-regular fa-circle fa-beat fa-3x"></i><i className="fa-solid fa-circle fa-beat fa-3x"></i><i className="fa-regular fa-circle fa-beat fa-3x"></i></div>
    return (
        <div className="container-fluid cont">
            <i className="fa fa-solid fa-plus fa-2x" onClick={() => setClubCreatePopUp(true)} style={{ position: 'absolute', top: '12%', right: '5%' }}></i>
            <img alt='' className="bgprop" src={clubkids} />

            {clubs.map((club) => (
                <div key={`${club.club_id}`} className="container-fluid" style={{ fontFamily: 'marker' }}>
                    <button className="button btn1" onClick={(e) => clubButton(e, club)}>{`${club.club_name}`}</button>
                    <button className="button btn7" onClick={() => setClubJoinPopUp(true)}>+</button>
                </div>
            ))}

            {clubJoinPopUp && <ClubJoin setClubJoinPopUp={setClubJoinPopUp} setUser={user} />}
            {clubCreatePopUp && <ClubCreate setClubCreatePopUp={setClubCreatePopUp} setUser={user} />}
        </div>
    )
}

export default Clubmenu