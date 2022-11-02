import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import '../static/verification_pop.css';
import giraffe from '../static/giraffe.svg';
import birdies from '../static/birdies.svg';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Forget  = props => {
    const { setPopUp } = props;
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
            let res = await axios.get('http://localhost:5000/registerr', {
            });
            console.log(res.data.msg);
        }
        catch (error) {
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
                    <span className='left'><p style={{ fontFamily: 'actor', color: 'var(--vista)', fontSize: '13px' }}>{msg}</p></span>
                    <span className='right'><a className="mt-0" style={{ fontFamily: 'actor' }} onClick={Resend}>Resend code</a></span>
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="password">Enter new password</label>
                    <input type="password" id="password" name="password" required className="form-control otp-box" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-light btn-lg bt_modal" >Enter</button>
                </div>
            </form>
            <ToastContainer position="top-right" progressClassName="toastProgress" />
        </div>
        // <div class="container-fluid cont">
        //     <image className="giraffe" src="./giraffe.svg" />
        //     <image className="birdie" src="./birdies.svg" />
        //     <form className="form-container" style="font-family: comfortaa;" action="/verify_forget_otp" method="post">
        //         <h3 className="text-center mb-5" style="font-family: marker;">Check your email!</h3>

        //         <div className="form-group">
        //             <label htmlFor="otp">Enter the verification code</label>
        //             <input type="text" id="otp" name="otp" required className="form-control otp-box" />
        //         </div>

        //         <div className="mb-2 text-end" style="font-size: 13px; font-family: actor;">
        //             <button type="submit" formnovalidate className="btn" formaction="/resend_forget_otp">Resend code</button>
        //         </div>

        //         <div className="form-group mb-3">
        //             <label htmlFor="password">Enter new password</label>
        //             <input type="password" id="password" name="password" required className="form-control otp-box" />
        //         </div>

        //         <div className="text-center">
        //             <button type="submit" id="pop_submit_button" className="btn btn-light btn-lg bt" data-toggle="modal"
        //                 data-target="#otpmodal">Enter</button>
        //         </div>

        //     </form >
        // </div >
    )
}
export default Forget;