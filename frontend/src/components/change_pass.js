import React, { useState } from 'react';
import { toast } from 'react-toastify';
import '../static/verification_pop.css';
import giraffe from '../static/giraffe.svg';
import birdies from '../static/birdies.svg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ChangePass = props => {
    const setPopUp = props.setPopUpPass;
    const navigate = useNavigate();
    const [new_pass, setNewPassword] = useState('');
    const [old_pass, setOldPassword] = useState('');
    const [msg, setMsg] = useState('');
    const [user] = useState(props.setUser);
    
    // const [email,setEmail]=useState('');

    const pass_verify = async (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/pass_verify', {
            old_pass: old_pass,
            new_pass: new_pass,
            email:user.email 
        })
        // console.log(user.email)
            .then(res => {
                if (res.status === 200) {
                    setMsg(res.data.msg);
                    toast.success("Password updated!");
                    setPopUp(false);
                    navigate('/profile');
              }
            })
            .catch(error => {
                if (error.response.status === 400) 
                { setMsg(error.response.data.msg); }
            });
    }

    return (
        <div className="container-fluid PopUp">
            <button className="popup-x" onClick={() => setPopUp(false)} >X</button>

            <img alt=''  className="giraffe" src={giraffe} />
            <img alt=''  className="birdie" src={birdies} />

            <form className="form-container_modal" style={{ fontFamily: 'comfortaa' }} 
            onSubmit={pass_verify} >

                <h3 className="text-center mb-4" style={{ fontFamily: 'marker', color: 'black', fontSize: '25px' }}>Change your password</h3>

                <div className="form-group">
                    <label htmlFor="old_pass">Enter the old password</label>
                    <input type="password" id="old_pass" name="old_pass" required className="form-control otp-box" 
                    value={old_pass} onChange={(e) => setOldPassword(e.target.value)} />
                    <span className='left' style={{ height: '13px' }}><p style={{ fontFamily: 'actor', color: 'var(--vista)', fontSize: '13px' }}>{msg}</p></span>
                    {/* <span className='right text-end'>
                        {isLoading && <i className='fa fa-spinner fa-spin'></i>}
                        <a href='/#' className="mt-0" style={{ fontFamily: 'actor' }} onClick={Resend}>  Resend code</a>
                    </span> */}
                </div>

                <div className="form-group mt-4 mb-3">
                    <label htmlFor="new_pass">Enter new password</label>
                    <input type="password" id="new_pass" name="new_pass" minLength="8" maxLength="15" required className="form-control otp-box" 
                    value={new_pass} onChange={(e) => setNewPassword(e.target.value)} />
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-light btn-lg bt_modal" >Enter</button>
                </div>
            </form>
        </div>
    )
}
export default ChangePass;