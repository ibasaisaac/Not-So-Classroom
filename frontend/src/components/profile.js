import React, { useState, useEffect } from 'react';
import '../static/profile.css';
import Calendar from 'react-calendar'

import axios from 'axios';
import ChangePass from './change_pass';

import 'react-toastify/dist/ReactToastify.css';

import CR_verification from './cr_verification';
import { toast } from 'react-toastify';

//import { ToastContainer, toast } from 'react-toastify';


const Profile = () => {

    //const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState('');
    const [date, setdate] = useState('');
    const [time, settime] = useState('');
    const [text, setText] = useState('');
    const [crRole, setCRbutton] = useState(false);
    const [event, setEvent] = useState({ place: '', room: '', date: '', time:'' , details: '' });
    const [popUp, setPopUp] = useState(false);
    const [popUpPass, setPopUpPass] = useState(false);
    const [progs, setProgs] = useState([]);
    const [data, setdata] = useState(''); 
    const [imgSrc, setImgSrc] = useState("Invalid Image Source");
    const [msg1, setMsg1] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        userprofile()
    }, []);



    const userprofile = async () => {
        axios.get('http://localhost:5000/getUser', {

        })
            .then((resp) => {
                setUser(resp.data);
                axios.get('http://localhost:5000/getdp'
                // ,{
                // headers:{
                //     "Content-Type":"application/json"
                // }
                // }
                )
                .then(function (res2) {
                    // console.log(res2.data)
                    // setPosts(res2.data);
                    if(res2.data.status===201){
                        console.log("dp ok");
                        setdata(res2.data.data);
                    }
                    else{
                        console.log("e");
                    }
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    const createGroupEvent = async (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/postevent', {
            place: event.place,
            room: event.room,
            date: event.date,
            time: event.time,
            details: event.details,
            category: 'quiz',
            student_id: user.student_id
        })
            .then(res => {
                if (res.status === 200) {
                    toast.success('Event created')
                    setEvent({place:'',room:'',date:'',time:'',details:''})
                    var newEvent = [res.data, ...event]
                    setEvent(newEvent);
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    const createClubEvent = async (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/postevent', {
            place: event.place,
            room: event.room,
            date: event.date,
            time: event.time,
            details: event.details,
            category: 'club',
            student_id: user.student_id
        })
            .then(res => {
                if (res.status === 200) {
                    toast.success('Event created')
                    setEvent({place:'',room:'',date:'',time:'',details:''})
                    var newEvent = [res.data, ...event]
                    setEvent(newEvent);
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    const CRbutton = async (e) => {
        e.preventDefault()
        if (user.role === 'cr') {
            setCRbutton(true);
        }
    }

    const handleProg = (e) => {
        setEvent({ ...event, place: e })
        switch (e) {
            case 'AB2': setProgs(['205', '301', '302', '304']); break;
            case 'AB3': setProgs(['105', '106']); break
            default: setProgs([])
        }
    }

    // const setimg = (e) => {
    //     setFile(e.target.files[0])
    //     console.log('kk')
    // }


    const postDp = async (e) => {
        e.preventDefault();
        var formdata = new FormData();
        formdata.set('op_id', user.student_id);
        formdata.append("photo", e.target.files[0]);

        await axios.post('http://localhost:5000/dp', formdata)
            .then(res => {
                if (res.status === 200) {
                    // setDP(e.target.files[0])
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
    function SubmitButton() {
        if (event.date && event.details && event.place && event.room && event.time) {
            return <button type="submit" className="btn btn-primary"
            style={{ backgroundColor: 'var(--vista)' }}>Enter</button>   
                    
        } else {
            return <button type="submit" disabled id="submit-button" className="btn btn-primary"
            style={{ backgroundColor: 'var(--vista)' }}>Enter</button> 

        };
    };

    const handlePopupPass = async (e) => {
         e.preventDefault();
        setPopUpPass(true);
    }

    const handlePopup = async (e) => {
        e.preventDefault();
        setPopUp(true);
    }

    return (
        <div>
            <header>
                <div className="wrapper">
                    <a href={`${user.dp}`} target="_blank" rel="noreferrer">
                        <img alt='' src={`${user.dp}`} width='250' />
                    <p className="c">Change</p>
                    <input className="my_file" type="file" id="photo" name="file" accept='image/*' onChange={postDp} />
                    </a>
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
                    <a href="#section2" className="btnn btn2" >CR</a>
                    <a href="#section3" className="btnn btn3" >Club Moderator</a>
                    <a href="#" style={{ color: 'black', position: 'relative', left: '20px' }}
                        onClick={handlePopup}
                    >Ask role access</a>
                </div>

                <div className="emm">
                    <p className="email" style={{ margin: '20px', display: 'inline' }}>Email: </p>
                    <p className="em" style={{ margin: '20px', display: 'inline' }}>{user.email}</p>
                </div>

                <div className="pp">
                    <p className="password" style={{ margin: '20px', display: 'inline' }}>Password:</p>
                    <p className="p" style={{ margin: '20px', display: 'inline' }}>*****</p>
                </div>

                <div className="c_s">
                    <a className="change" href="#" style={{ color: 'black' }} 
                    onClick={handlePopupPass}
                    >Change</a>
                    <a href="/#" style={{ color: 'grey' }}>Save</a>
                </div>

                <div className="all">
                    <p className="allow">Allow desktop notification:</p>
                    <input type="checkbox" className="chk" id="switch" />
                    <label className="labell" htmlFor="switch"></label>
                    <div className="s"></div>
                    <div className="background"></div>
                </div>
            </div>

            <div id="section2">
                <form onSubmit={createGroupEvent}>
                    <h5 style={{ position: 'relative', left: '22%', height: '100%', width: '100%',
                        background: 'white'}}>My Group</h5>
                    <div className="sec2">
                        <p style={{ position: 'relative', left: '5%' }}>Add Event:</p>
                        <div id="block">
                            <div id="roomblock" className="room">
                                <select defaultValue={0} className="form-control custom-select" id="room"
                                    style={{ backgroundColor: 'white', border: 'none' }}
                                    //onChange={this.handleInputChange}
                                    onChange={(e) => setEvent({ ...event, room: e.target.value })}>
                                    <option value={0}>Select Room</option>
                                    {progs.map((p) => (
                                        <option value={p}>{p}</option>
                                    ))}
                                </select>
                            </div>
                            <div id="placeblock" className="clc">

                                <select defaultValue={0} className="form-control custom-select" id="place"
                                    style={{ backgroundColor: 'white', border: 'none' }}
                                    //onChange={this.handleInputChange}
                                    onChange={(e) => handleProg(e.target.value)}>
                                    <option value={0}>Select Place</option>
                                    <option value="AB2">AB2</option>
                                    <option value="AB3">AB3</option>
                                </select>
                            </div>

                            <div id="timeblock" className="d">
                                <input type="date" style={{ backgroundColor: 'white', border: 'none' }}
                                    onChange={(e) => setEvent({ ...event, date: e.target.value })} />
                            </div>
                            <div id="timeblock" className="t">
                                <input type="time" style={{ backgroundColor: 'white', border: 'none' }}
                                    className="start-time"
                                    onChange={(e) => setEvent({ ...event, time: e.target.value })} />
                            </div>
                        </div>
                        <div id="block">
                            <div id="detailsblock" style={{ display: 'flex'}}>
                                <textarea rows="3" className="form-control details" 
                                style={{ resize: 'none' }} placeholder="Add Details"
                                    value={event.details} onChange={(e) => setEvent({ ...event, details: e.target.value })} ></textarea>
                            </div>
                            <div id="entergblock" className="enterg">
                                <SubmitButton />                         
                            </div>
                        </div>
                    </div>
                    
                </form>

            </div>

            <div id="section3">
            <form onSubmit={createClubEvent}>
                    <h5 style={{ position: 'relative', left: '22%', height: '100%', width: '100%',
                        background: 'white'}}>My Club</h5>
                    <div className="sec2">
                        <p style={{ position: 'relative', left: '5%' }}>Add Event:</p>
                        <div id="block">
                            <div id="roomblock" className="room">
                                <select defaultValue={0} className="form-control custom-select" id="room"
                                    style={{ backgroundColor: 'white', border: 'none' }}
                                    //onChange={this.handleInputChange}
                                    onChange={(e) => setEvent({ ...event, room: e.target.value })}>
                                    <option value={0}>Select Room</option>
                                    {progs.map((p) => (
                                        <option value={p}>{p}</option>
                                    ))}
                                </select>
                            </div>
                            <div id="placeblock" className="clc">

                                <select defaultValue={0} className="form-control custom-select" id="place"
                                    style={{ backgroundColor: 'white', border: 'none' }}
                                    //onChange={this.handleInputChange}
                                    onChange={(e) => handleProg(e.target.value)}>
                                    <option value={0}>Select Place</option>
                                    <option value="AB2">AB2</option>
                                    <option value="AB3">AB3</option>
                                </select>
                            </div>

                            <div id="timeblock" className="d">
                                <input type="date" style={{ backgroundColor: 'white', border: 'none' }}
                                    onChange={(e) => setEvent({ ...event, date: e.target.value })} />
                            </div>
                            <div id="timeblock" className="t">
                                <input type="time" style={{ backgroundColor: 'white', border: 'none' }}
                                    className="start-time"
                                    onChange={(e) => setEvent({ ...event, time: e.target.value })} />
                            </div>
                        </div>
                        <div id="block">
                            <div id="detailsblock" style={{ display: 'flex'}}>
                                <textarea rows="3" className="form-control details" 
                                style={{ resize: 'none' }} placeholder="Add Details"
                                    value={event.details} onChange={(e) => setEvent({ ...event, details: e.target.value })} ></textarea>
                            </div>
                            <div id="entergblock" className="enterg">
                                <SubmitButton />                         
                            </div>
                        </div>
                    </div>
                    
                </form>

            </div>
            {popUp && <CR_verification setPopUp={setPopUp} setUser={user} />}
            {popUpPass && <ChangePass setPopUpPass={setPopUpPass} setUser={user} />}
        </div >
    )
}

export default Profile