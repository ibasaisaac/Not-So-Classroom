import React, { useState } from 'react';
import '../static/login.css';
import Forget from './forget';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState(''); //currentState, function used to update state, initial state set to empty string
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [msg1, setMsg1] = useState('');
    const [msg2, setMsg2] = useState('');
    const history = useHistory();
    const [popUp, setPopUp] = useState(false);

    const Auth = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/login', {
                email: email + '@iut-dhaka.edu',
                password: password,
                remember: remember
            });
            history.push("./home");
        } catch (error) {
            if (error.response.status === 404) { setMsg1(error.response.data.msg); }
            else if (error.response.status === 400) { setMsg2(error.response.data.msg); }
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
                console.log("here");
               let res=await axios.post('http://localhost:5000/forget', {
                    email: email + '@iut-dhaka.edu'
                });
                console.log(res.data.msg);
                if (res.status === 200) {
                    setPopUp(true);
                }
            }
            catch (error) {
                if (error.response.status === 402) { setMsg1(error.response.data.msg); }
            };
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
                                <input type="text" id="email" name="email" required className="form-control" style={{ borderRadius: 0 }} value={email} onChange={(e) => setEmail(e.target.value)} />
                                <div className="input-group-append">
                                    <span className="input-group-text" style={{ borderRadius: 0 }}>@iut-dhaka.edu</span>
                                </div>
                            </div>
                            <p style={{ fontFamily: 'actor', color: 'var(--vista)', fontSize: '13px' }}>{msg1}</p>
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" required className="form-control" style={{ borderRadius: 0 }} value={password} onChange={(e) => setPassword(e.target.value)} />

                            <span className='left'><p style={{ fontFamily: 'actor', color: 'var(--vista)', fontSize: '13px' }}>{msg2}</p></span>
                            <span className='right'><a className="mt-0" style={{ fontFamily: 'actor' }} onClick={Forget_pass}>Forgot your password?</a></span>
                        </div>

                        <label htmlFor="remember" className="mb-2" style={{ fontSize: '13px', fontFamily: 'actor' }}>
                            <input type="checkbox" id="remember" name="remember" checked={remember} onChange={() => setRemember(!remember)} /> Keep me logged in
                        </label>

                        <div className="text-center mb-3">
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