import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import banner from '../static/session_banner.png';
import '../static/club.css';


const Session = props => {
    const setPopUp = props.setSessionPopUp;
    const [session] = useState(props.setSessionDetails)
    const [user] = useState(props.setUser);

    const Book = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/book', {
            participant_id: user.student_id,
            session_id: session.event_id,
        })
            .then(res => {
                if (res.status === 200) {
                    setPopUp(false);
                    toast.success("Session booked!");
                }
            })
            .catch(error => {
                console.log(error);
            });
    }


    return (
        <div className="container-fluid PopUpp">
            <button className="popup-x" onClick={() => setPopUp(false)} >X</button>
            <img className='mask2 mb-3' alt='banner' src={banner} />
            <h4>{session.title}</h4>
            <h5>{session.date}</h5>
            <p>{session.info}</p>
            <div className="text-center mb-3">
                <button type="submit" className="btn btn-light btn-lg bt_modal" onClick={Book}>Book</button>
            </div>
        </div >
    )
}


export default Session;