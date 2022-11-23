import React, { useState, useEffect } from 'react';
import '../static/profile.css';
import Calendar from 'react-calendar'

import axios from 'axios';

import 'react-toastify/dist/ReactToastify.css'; 

import CR_verification from './cr_verification';

//import { ToastContainer, toast } from 'react-toastify';


const Profile = () => {

    //const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState('');
    const [date , setdate] = useState('');
    const [time , settime] = useState('');
    const [text, setText] = useState('');

    const [popUp, setPopUp] = useState(false);

    useEffect(() => {
        userprofile()
    }, []);


    const userprofile = async () => {
         axios.get('http://localhost:5000/getUser', {
        })
            .then((resp) => {
                setUser(resp.data);
                //setStudentID(resp.data.student_id);
                //console.log(resp.data);
            })
            .catch(error => {
                console.log(error);
            })
    }
    const handlePopup = async () => {
        setPopUp(true);
    }

    return (
        <div>
            <header>
                <div className="wrapper">
                    <input type="file" className="my_file" />
                        <p className="c">Picture</p>
                        <p className="p">Change</p>
                </div>
                <div>
                    <p className="id" style={{ fontFamily: 'comfortaa' }}>{user.student_id}</p>
                    <p className="ib" style={{ fontFamily: 'actor' }}>@{user.username}</p>
                </div>
            </header>

            <div id="section1">
                <div className="container">
                    <p className="role">Role:</p>
                    <button className="btnn btn1">Student</button>
                    <a href="#section2" className="btnn btn2">CR</a>
                    <a href="#section3" className="btnn btn3">Club Moderator</a>
                    <a href="#" style={{color: 'black', position: 'relative', left: '20px'}}
                         onClick={handlePopup}
                        >Ask role access</a>
                </div>

                <div className="emm">
                    <p className="email" style={{margin: '20px', display: 'inline'}}>Email: </p>
                    <p className="em" style={{margin: '20px', display: 'inline'}}>{user.email}</p>
                </div>

                <div className="pp">
                    <p className="password" style={{margin: '20px', display: 'inline'}}>Password:</p>
                    <p className="p" style={{margin: '20px', display: 'inline'}}>*****</p>
                </div>

                <div className="c_s">
                    <a className="change" href="/#" style={{color:'black'}}>Change</a>
                    <a href="/#" style={{color:'grey'}}>Save</a>
                </div>

                <div className="all">
                    <p className="allow">Allow desktop notification:</p>
                    <input type="checkbox" className="chk" id="switch" />
                    <label className="labell" htmlFor="switch"></label>
                    <div className="s"></div>
                    <div className="background"></div>
                </div>
            </div>
            {popUp && <CR_verification setPopUp={setPopUp} />}

            <div id="section2">
                <h5 style={{position: 'relative', left: '22%', top: '82.5px'}}>My Groups</h5>
                <div className="sec2">
                    <p style={{position: 'relative', left: '5%', top: '35px'}}>Add Event:</p>
                    <div id="block">
                        <div id="roomblock" className="room">
                            <select className="form-control custom-select" 
                            style={{ backgroundColor: 'white', border: 'none' }}
                            //onChange={this.handleInputChange}
                            >
                                <option selected>Select Room</option>
                                <option value="301">301</option>
                                <option value="302">302</option>
                                <option value="105">105</option>
                                <option value="106">106</option>
                            </select>
                        </div>
                        <div id="placeblock" className="clc">
                            <select className="form-control custom-select" 
                            style={{ backgroundColor: 'white', border: 'none' }}
                            //onChange={this.handleInputChange}
                            >
                                <option selected>Select Place</option>
                                <option value="AB2">AB2</option>
                                <option value="AB3">AB3</option>
                            </select>
                        </div>
                        <div id="timeblock" className="dt">
                            <input type="date" style={{ backgroundColor: 'white', border: 'none' }}
                            onChange={(e)=>{setdate(e.target.value);alert(date)} }  />  
                        </div>
                        <div id="timeblock" className="dt">
                            <input type="time" style={{ backgroundColor: 'white', border: 'none' }}
                                className="start-time"
                                onChange={(e)=>{settime(e.target.value);alert(time)} } 
                                /> 
                        </div>
                    </div>
                    <div  style={{ display: 'flex', alignItems: 'center' }}>
                         <textarea rows="2" className="form-control details" style={{ resize: 'none' }} placeholder="Add Details" 
                         value={text} onChange={(e) => setText(e.target.value)} ></textarea>
                    </div>
                </div>
                <div className="enter">
                    <button type="submit" className="btn btn-primary" 
                    style={{ backgroundColor: 'var(--vista)' }}>Enter</button>
                </div>

            </div>

            <div id="section3">
                <h5 style={{position: 'relative', left: '22%', top: '82.5px'}}>My Clubs</h5>
                <div className="sec3">
                    <p style={{position: 'relative', left: '5%', top: '15px'}}>Add Event:</p>

                    
                    <div id="block">
                        <div id="roomblock" className="room">
                            <select className="form-control custom-select" 
                            style={{ backgroundColor: 'white', border: 'none' }}
                            //onChange={this.handleInputChange}
                            >
                                <option selected>Select Room</option>
                                <option value="301">301</option>
                                <option value="302">302</option>
                                <option value="105">105</option>
                                <option value="106">106</option>
                            </select>
                        </div>
                        <div id="placeblock" className="clc">
                            <select className="form-control custom-select" 
                            style={{ backgroundColor: 'white', border: 'none' }}
                            //onChange={this.handleInputChange}
                            >
                                <option selected>Select Place</option>
                                <option value="AB2">AB2</option>
                                <option value="AB3">AB3</option>
                            </select>
                        </div>
                        <div id="timeblock" className="dt">
                            <input type="date" style={{ backgroundColor: 'white', border: 'none' }}
                            onChange={(e)=>{setdate(e.target.value);alert(date)} }  />  
                        </div>
                        <div id="timeblock" className="dt">
                            <input type="time" style={{ backgroundColor: 'white', border: 'none' }}
                                className="start-time"
                                onChange={(e)=>{settime(e.target.value);alert(time)} } 
                            /> 
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                         <textarea rows="2" className="form-control details" style={{ resize: 'none' }} placeholder="Add Details" 
                         value={text} onChange={(e) => setText(e.target.value)} ></textarea>
                    </div>
                </div>
                <div className="enter">
                    <button type="submit" className="btn btn-primary" 
                    style={{ backgroundColor: 'var(--vista)' }}>Enter</button>
                </div>
            </div>
        </div >
    )
}

export default Profile