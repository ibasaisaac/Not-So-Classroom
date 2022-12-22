import React, { useState, useEffect } from 'react';
import '../static/profile.css';
import Calendar from 'react-calendar'

import axios from 'axios';

import 'react-toastify/dist/ReactToastify.css'; 

import CR_verification from './cr_verification';
import { toast } from 'react-toastify';

//import { ToastContainer, toast } from 'react-toastify';


const Profile = () => {

    //const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState('');
    const [date , setdate] = useState('');
    const [time , settime] = useState('');
    const [text, setText] = useState('');
    const [crRole, setCRbutton] = useState(false);
    const [event, setEvent] = useState({ place: '', room: '', date: '', time: '', category: '', details: ''});
    const [popUp, setPopUp] = useState(false);
    const [progs, setProgs] = useState([]);
    const [file, setFile] = useState('');
    

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

    const createEvent = async(e) => {
        e.preventDefault();
        axios.get('http://localhost:5000/postevent',{
            place: event.place,
            room: event.room,
            date: event.date,
            time: event.time,
            details: event.details
        })
        .then(res => {
            if (res.status === 200) {
                toast.success('Event created')
                var newEvent = [res.data, ...event]
                setEvent(newEvent);
            }
        })
        .catch(error => {
            console.log(error);
        })
    }
    const handlePopup = async () => {
        setPopUp(true);
    }

    const CRbutton = async(e)=>{
        e.preventDefault()
        if(user.role === 'cr')
        {
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

    const setimg = (e) => {
        setFile(e.target.files[0])
        console.log('kk')
    }

    const postDp = async (e) =>{
        setFile(e.target.files[0])
        console.log('oo')
        e.preventDefault();
        console.log('jj');

        var formdata = new FormData();
        formdata.append("photo",file);

        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
        console.log("mm1"); 
        axios({
            method: "post",
            url: "http://localhost:5000/dp",
            data: formdata,
            headers: { "Content-Type": "multipart/form-data" },
            transformRequest: (data, headers) => {
                // !!! override data to return formData
                // since axios converts that to string
                return formdata;
            },
          })
            .then(function (response) {
              //handle success
              console.log("mm2");
              console.log(response);
            })
            .catch(function (response) {
              //handle error
              console.log("e");
              console.log(response);
            });
          
        // const res = await axios.post('http://localhost:5000/dp',formdata,config); 
        // console.log(res);
        console.log("mm"); 
    }

    return (
        <div>
            <header>
                <div className="wrapper">
                    <p className="c">Change</p>
                        {/* <p className="p">Picture</p> */}
                    {/* <form onSubmit={postDp}> */}
                        <input type="file" name="photo" className="my_file" onChange={postDp}/>
                    {/* </form> */}
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

            <div id="section2">
                <form onSubmit={createEvent}>
                    <h5 style={{position: 'relative', left: '22%', top: '82.5px'}}>My Groups</h5>
                    <div className="sec2">
                        <p style={{position: 'relative', left: '5%', top: '35px'}}>Add Event:</p>
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

                            <div id="timeblock" className="dt">
                                <input type="date" style={{ backgroundColor: 'white', border: 'none' }}
                                onChange={(e) => setEvent({ ...event, date: e.target.value })}  />  
                            </div>
                            <div id="timeblock" className="dt">
                                <input type="time" style={{ backgroundColor: 'white', border: 'none' }}
                                    className="start-time"
                                    onChange={(e) => setEvent({ ...event, time: e.target.value })} /> 
                            </div>
                        </div>
                        <div  style={{ display: 'flex', alignItems: 'center' }}>
                            <textarea rows="2" className="form-control details" style={{ resize: 'none' }} placeholder="Add Details" 
                            value={text} onChange={(e) => setText(e.target.value)} ></textarea>
                        </div>
                    </div>
                    <div className="cat">
                        {/* onChange={(e) => setEvent({ ...event, category: 'Quiz' })} */}
                    </div>
                    <div className="enter">
                        <button type="submit" className="btn btn-primary" 
                        style={{ backgroundColor: 'var(--vista)' }}>Enter</button>
                    </div>
                </form>

            </div>

            <div id="section3">
                <h5 style={{position: 'relative', left: '22%', top: '82.5px'}}>My Clubs</h5>
                <div className="sec3">
                    <p style={{position: 'relative', left: '5%', top: '15px'}}>Add Event:</p>

                    
                    <div id="block">
                        <div id="roomblock" className="room">
                            <select defaultValue={0} className="form-control custom-select" id="room"
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
            {popUp && <CR_verification setPopUp={setPopUp} setUser={user} />}
        </div >
    )
}

export default Profile