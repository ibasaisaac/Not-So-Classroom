import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import '../static/verification_pop.css';
import giraffe from '../static/giraffe.svg';
import birdies from '../static/birdies.svg';


const GroupJoin = props => {
    const setPopUp = props.setGroupJoinPopUp
    const [user] = useState(props.setUser)
    const [code, setCode] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();


    const Verify = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/joingroup', {
            code: code,
            student_id: user.student_id
        })
            .then(res => {
                if (res.status === 200) {
                    setPopUp(false);
                    navigate('/group');
                }
            })
            .catch(error => {
                if (error.response.status === 402) { setMsg(error.response.data.msg); }
            });
    }

    return (
        <div className="container-fluid PopUp">
            <button className="popup-x" onClick={() => setPopUp(false)} >X</button>

            <img alt='' className="giraffe" src={giraffe} />
            <img alt='' className="birdie" src={birdies} />

            <form className="form-container_modal" style={{ fontFamily: 'comfortaa' }} onSubmit={Verify} >

                <h3 className="text-center mb-5" style={{ fontFamily: 'marker', color: 'black', fontSize: '25px' }}>Group Code</h3>

                <div className="form-group">
                    <label htmlFor="otp">Ask your CR for the group code</label>
                    <input type="text" id="otp" name="otp" required className="form-control otp-box" value={code} onChange={(e) => { setCode(e.target.value); setMsg('') }} />
                    <span className='left' style={{ height: '13px' }}><p style={{ fontFamily: 'actor', color: 'var(--vista)', fontSize: '13px' }}>{msg}</p></span>
                </div>
                <div className="text-center mt-5">
                    <button type="submit" className="btn btn-light btn-lg bt_modal" >Enter</button>
                </div>
            </form>
        </div>
    )
}
export default GroupJoin;