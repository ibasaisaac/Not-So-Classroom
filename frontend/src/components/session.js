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
        // await axios.post('http://localhost:5000/book', {
        //     participant_id: user.student_id,
        //     session_id: session.session_id,
        // })
        //     .then(res => {
        //         if (res.status === 200) {
        //             setPopUp(false);
        //             toast.success("Session booked!");
        //         }
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });
    }




    return (
        <div className="container-fluid PopUpp">
            <button className="popup-x" onClick={() => setPopUp(false)} >X</button>
            <img alt='banner' src={banner} />
            <h4>session.title</h4>
            <h5>session.time</h5>
            <p>session.details</p>
            <button type='submit' clasName='btn btn-light btn-lg btn-modal'></button>
        </div >
    )
}


export default Session;