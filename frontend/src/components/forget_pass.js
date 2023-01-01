import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import '../static/verification_pop.css';
import giraffe from '../static/giraffe.svg';
import birdies from '../static/birdies.svg';


const Forget = props => {
    const [isLoading, setIsLoading] = useState(false);
    const setPopUp = props.setPopUp;
    const navigate = useNavigate();
    const [otp, setOTP] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');

    const Verify = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/verify', {
            otp: otp,
            password: password
        })
            .then(res => {
                if (res.status === 200) {
                    setMsg(res.data.msg);
                    toast.success("Password updated!");
                    setPopUp(false);
                    navigate('/login');
                }
            })
            .catch(error => {
                if (error.response.status === 402) { setMsg(error.response.data.msg); }
            });
    }

    const Resend = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            let res = await axios.get('http://localhost:5000/registerr', {
            });
            console.log(res.data.msg);
            setIsLoading(false);
        }
        catch (error) {
            setIsLoading(false);
            window.alert(error.response.data.msg);
        };
    }

    
    return (
        <div className="container-fluid PopUp">
            <button className="popup-x" onClick={() => setPopUp(false)} >X</button>

            <img alt=''  className="giraffe" src={giraffe} />
            <img alt=''  className="birdie" src={birdies} />

            <form className="form-container_modal" style={{ fontFamily: 'comfortaa' }} onSubmit={Verify} >

                <h3 className="text-center mb-4" style={{ fontFamily: 'marker', color: 'black', fontSize: '25px' }}>Check your email!</h3>

                <div className="form-group">
                    <label htmlFor="otp">Enter the verification code</label>
                    <input type="text" id="otp" name="otp" required className="form-control otp-box" value={otp} onChange={(e) => setOTP(e.target.value)} />
                    <span className='left' style={{ height: '13px' }}><p style={{ fontFamily: 'actor', color: 'var(--vista)', fontSize: '13px' }}>{msg}</p></span>
                    <span className='right text-end'>
                        {isLoading && <i className='fa fa-spinner fa-spin'></i>}
                        <button style={{ backgroundColor: 'transparent', border: '0', fontFamily: 'actor'}}className="mt-0" onClick={Resend}>  Resend code</button></span>
                </div>

                <div className="form-group mt-4 mb-3">
                    <label htmlFor="password">Enter new password</label>
                    <input type="password" id="password" name="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must be more than 8 characters with at least one number, one uppercase and one lowercase letter" required className="form-control otp-box" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-light btn-lg bt_modal" >Enter</button>
                </div>
            </form>
        </div>
    )
}
export default Forget;