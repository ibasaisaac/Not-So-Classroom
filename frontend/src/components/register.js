import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import '../static/register.css';
import Verification from './verification';
import axios from "axios";
import { useHistory } from "react-router-dom";

const Register = () => {
    
    const [id, setID] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [check, setChecked] = useState(false);
    const [msg1, setMsg1] = useState('');
    const [msg2, setMsg2] = useState('');
    const [msg3, setMsg3] = useState('');
    const [popUp, setPopUp] = useState(false);
 
    const Register = async (e) => {
        e.preventDefault();
        try {
            let res = await axios.post('http://localhost:5000/register', {
                id: id,
                email: email + '@iut-dhaka.edu',
                password: password,
                username: username
            });
            console.log(res.data.msg);
            if (res.status === 200) {
                setPopUp(true);
            }
        }
        catch (error) {
            if (error.response.status === 404) { setMsg1(error.response.data.msg); }
            else if (error.response.status === 400) { setMsg1(error.response.data.msg); }
            else if (error.response.status === 402) { setMsg3(error.response.data.msg); }
            else if (error.response.status === 401) { setMsg2(error.response.data.msg); }
            else
                window.alert(error.response.data.msg);
        };
    }

    function SubmitButton() {
        if (id && email && username && password && check) {
            return <button type="submit" id="submit-button" className="btn btn-light btn-md btn-block bt" >Continue</button>
        } else {
            return <button type="submit" disabled id="submit-button" className="btn btn-light btn-md btn-block bt">Continue</button>

        };
    };

    return (
        <div className={"container-fluid bg"}>
            <div className="row content">
                <div className="col-md-8">
                    <form className="form-container" style={{ fontFamily: 'comfortaa' }} onSubmit={Register} >
                        <h3 className="text-center mb-4">Create an account</h3>

                        <div className="form-group mb-3">
                            <label htmlFor="id">Student ID</label>
                            <input type="text" id="id" name="id" pattern="[0-9]{9}" required className="form-control" style={{ borderRadius: 0 }} value={id} onChange={(e) => setID(e.target.value)} />
                            <p style={{ fontFamily: 'actor', color: 'var(--vista)', fontSize: '13px' }}>{msg1}</p>
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="email">Email</label>
                            <div className="input-group">
                                <input type="text" id="email" name="email" required className="form-control" style={{ borderRadius: 0 }} value={email} onChange={(e) => setEmail(e.target.value)} />
                                <div className="input-group-append">
                                    <span className="input-group-text" style={{ borderRadius: 0 }}>@iut-dhaka.edu</span>
                                </div>
                            </div>
                            <p style={{ fontFamily: 'actor', color: 'var(--vista)', fontSize: '13px' }}>{msg3}</p>
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" name="username" minLength="3" required className="form-control" style={{ borderRadius: 0 }} value={username} onChange={(e) => setUsername(e.target.value)} />
                            <p style={{ fontFamily: 'actor', color: 'var(--vista)', fontSize: '13px' }}>{msg2}</p>
                        </div>

                        <div className="form-group mb-4">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" minLength="8" maxLength="15" required className="form-control" style={{ borderRadius: 0 }} value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <label className="mb-2" style={{ fontSize: '13px', fontFamily: 'actor' }}>
                            <input type="checkbox" id="check" required checked={check} onChange={() => setChecked(!check)} /> By registering, you are agree to our Terms of Service and Privacy Policy.
                        </label>

                        <div className="d-grid col-12 mb-3">
                            <SubmitButton />
                        </div>

                        <div style={{ fontSize: '13px' }}>
                            <a href="./login">Already have an account? </a>
                        </div>
                    </form>
                </div >
            </div >
            {popUp && <Verification setPopUp={setPopUp} />}
        </div >
    )
}

export default Register