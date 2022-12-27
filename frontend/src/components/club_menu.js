import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../static/clubmenu.css';
import { useNavigate } from 'react-router-dom';
import ClubJoin from './join_club';
import us from '../static/us.png';


const Clubmenu = () => {
    const [user, setUser] = useState('')
    const [clubJoinPopUp, setClubJoinPopUp] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getUser()
    }, []);

    const getUser= async () => {
    await axios.get('http://localhost:5000/getuser', {
    })
        .then(function (res1) {
            console.log(res1.data);
            setUser(res1.data);
        })
        .catch(error => {
            console.log(error);
        });
}

    const clubButton = async (e) => {
        e.preventDefault()
        console.log('click')
        navigate('/club');
    }

    return (
        <div className="container-fluid cont">
            <img alt='' className="us" src={us} />

            <div className="container-fluid" style={{ fontFamily: 'marker' }}>
                <button className="button btn1" onClick={(e) => clubButton(e)}>IUT COMPUTER SOCIETY (IUTCS)</button>
                <button className="button btn7" onClick={() => setClubJoinPopUp(true)}>+</button>
            </div>
            {clubJoinPopUp && <ClubJoin setClubJoinPopUp={setClubJoinPopUp}  setUser={user}/>}
        </div>
    )
}

export default Clubmenu