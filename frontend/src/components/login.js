import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Forget from './forget_pass.js';

import '../static/login.css';




const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState(''); //currentState, function used to update state, initial state set to empty string
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [msg1, setMsg1] = useState('');
    const [msg2, setMsg2] = useState('');
    const navigate = useNavigate();
    const [popUp, setPopUp] = useState(false);


    const Auth = async (e) => {
        e.preventDefault();

        try {
           await axios.post('http://localhost:5000/login', {
                email: email + '@iut-dhaka.edu',
                password: password,
                remember: remember
            })
            navigate("/home");
        } catch (error) {
            if (error.response.status === 404) { setMsg1(error.response.data.msg); setEmail('')}
            else if (error.response.status === 400) { setMsg2(error.response.data.msg); setPassword('') }
            // if (error.response) 
            else {
                window.alert(error.response.data.msg);
            }
        }
    }

    const Forget_pass = async (e) => {

        if (email) {
            e.preventDefault();
            try {
                setIsLoading(true);
                let res = await axios.post('http://localhost:5000/forget', {
                    email: email + '@iut-dhaka.edu'
                })
                console.log(res.data.msg);
                if (res.status === 200) {
                    setIsLoading(false);
                    setPopUp(true);
                }
            }
            catch (error) {
                if (error.response.status === 402) { setMsg1(error.response.data.msg); setEmail('')}
                setIsLoading(false);
            }
        }
        else {
            setMsg1("Email required*");
        }
    }

    return (
        <div className="container-fluid bg">
            <div className="row content">
                <div className="col-md-8">
                    <form className="form-container" style={{ fontFamily: 'comfortaa' }} onSubmit={Auth}>
                        <h3 className="text-center mb-3">Welcome back!</h3>

                        <div className="form-group mb-3">
                            <label htmlFor="email">Email</label>
                            <div className="input-group">
                                <input type="text" id="email" name="email" required className="form-control" style={{ borderRadius: 0 }} value={email} onChange={(e) => {setEmail(e.target.value); setMsg1('')}} />
                                <div className="input-group-append">
                                    <span className="input-group-text" style={{ borderRadius: 0 }}>@iut-dhaka.edu</span>
                                </div>
                            </div>
                            <p style={{ fontFamily: 'actor', color: 'var(--vista)', fontSize: '13px' }}>{msg1}</p>
                        </div>

                        <div className="form-group mb-4">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" required className="form-control" style={{ borderRadius: 0 }} value={password} onChange={(e) => {setPassword(e.target.value); setMsg2('')} }/>

                            <span className='left' style={{ height: '13px' }}><p style={{ fontFamily: 'actor', color: 'var(--vista)', fontSize: '13px' }}>{msg2}</p></span>
                            <span className='right text-end'>
                                {isLoading && <i className='fa fa-spinner fa-spin'></i>}
                                <a href='/#' className="" style={{ fontFamily: 'actor' }} onClick={Forget_pass}> Forgot your password?</a>
                            </span>
                        </div>

                        <label htmlFor="remember" style={{ fontSize: '13px', fontFamily: 'actor' }}>
                            <input type="checkbox" id="remember" name="remember" checked={remember} onChange={() => setRemember(!remember)} /> Keep me logged in
                        </label>

                        <div className="text-center mt-3 mb-3">
                            <button type="submit" className="btn btn-light btn-lg bt">Login</button>
                        </div>

                        <div>
                            Need an account? <a href="./register">Register</a>
                        </div>
                    </form>
                </div>
            </div>
            {popUp && <Forget setPopUp={setPopUp} />}
        </div>
    )
}

export default Login