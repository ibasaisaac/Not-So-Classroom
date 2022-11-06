import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import '../static/verification_pop.css';
import giraffe from '../static/giraffe.svg';
import birdies from '../static/birdies.svg';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Verification = props => {
    const [isLoading, setIsLoading] = useState(false);
    const { setPopUp } = props;
    const [otp, setOTP] = useState('');
    const [msg, setMsg] = useState('');
    const history = useHistory();


    const Verify = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/verify', {
            otp: otp
        })
            .then(res => {
                if (res.status === 200) {
                    setMsg(res.data.msg);
                    toast.success("Registration Successful!");
                    // setPopUp(false);
                    // history.push('./login');
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

            <img className="giraffe" src={giraffe} />
            <img className="birdie" src={birdies} />

            <form className="form-container_modal" style={{ fontFamily: 'comfortaa' }} onSubmit={Verify} >

                <h3 className="text-center mb-5" style={{ fontFamily: 'marker', color: 'black', fontSize: '25px' }}>Check your email!</h3>

                <div className="form-group">
                    <label htmlFor="otp">Enter the verification code</label>
                    <input type="text" id="otp" name="otp" required className="form-control otp-box" value={otp} onChange={(e) => setOTP(e.target.value)} />
                    <span className='left' style={{height: '13px'}}><p style={{ fontFamily: 'actor', color: 'var(--vista)', fontSize: '13px' }}>{msg}</p></span>
                    <span className='right text-end'>
                    {isLoading && <i className='fa fa-spinner fa-spin'></i>}
                        <a className="mt-0" style={{ fontFamily: 'actor' }} onClick={Resend}>  Resend code</a>
                        </span>
                </div>
                <div className="text-center mt-5">
                    <button type="submit" className="btn btn-light btn-lg bt_modal" >Enter</button>
                </div>
            </form>
            <ToastContainer position="top-right" progressClassName="toastProgress" />
        </div>
    )
}
export default Verification;