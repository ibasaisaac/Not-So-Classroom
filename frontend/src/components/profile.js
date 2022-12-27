import React, { useState, useEffect } from 'react';
import '../static/profile.css';
import axios from 'axios';
import ChangePass from './change_pass';
import CR_verification from './cr_verification';
import Product from './product';
import { toast } from 'react-toastify';


const Profile = () => {
    const [user, setUser] = useState('');
    const [event, setEvent] = useState({ place: '', room: '', date: '', time: '', details: '' });
    const [popUp, setPopUp] = useState(false);
    const [popUpPass, setPopUpPass] = useState(false);
    const [progs, setProgs] = useState([]);
    const [orders, setOrders] = useState('')
    const [item, setItem] = useState('')
    const [popUpProduct, setPopUpProduct] = useState(false);

    useEffect(() => {
        prepareProfile()
    }, []);

    const prepareProfile = async () => {
        axios.get('http://localhost:5000/getUser', {
        })
            .then((resp) => {
                setUser(resp.data);
                axios.post('http://localhost:5000/getorders', {
                    buyer_id: resp.data.student_id
                })
                    .then(function (res2) {
                        if (res2.status === 201) {
                            setOrders(res2.data)
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
            category: 'Quiz',
            student_id: user.student_id
        })
            .then(res => {
                if (res.status === 200) {
                    toast.success(res.data.msg)
                    setEvent({ place: '', room: '', date: '', time: '', details: '' });
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
                    setEvent({ place: '', room: '', date: '', time: '', details: '' })
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handleProg = (e) => {
        setEvent({ ...event, place: e })
        switch (e) {
            case 'AB2': setProgs(['205', '301', '302', '304']); break;
            case 'AB3': setProgs(['105', '106']); break
            default: setProgs([])
        }
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


    const postDp = async (e) => {
        e.preventDefault();
        var formdata = new FormData();
        formdata.set('op_id', user.student_id);
        formdata.append("photo", e.target.files[0]);

        await axios.post('http://localhost:5000/dp', formdata)
            .then(res => {
                if (res.status === 200) {
                    user.dp = e.target.files[0]
                }
            })
            .catch(error => {
                console.log(error);
            });
    }


    const handlePopupPass = async (e) => {
        e.preventDefault();
        setPopUpPass(true);
    }
    const handlePopup = async (e) => {
        e.preventDefault();
        setPopUp(true);
    }


    if (!user || !orders)
        return <div style={{ textAlign: 'center', lineHeight: '600px' }}><i className="fa-regular fa-circle fa-beat fa-3x"></i><i className="fa-solid fa-circle fa-beat fa-3x"></i><i className="fa-regular fa-circle fa-beat fa-3x"></i></div>
    return (
        <div>
            <header>
                <div className="wrapper">
                    <img className="my_dp" alt='' src={`${user.dp}`} />
                    <div className="middle">
                        <div className="text">
                            <input className="my_file" type="file" id="photo" name="file" accept='image/*'
                                onChange={postDp} />Change</div>
                    </div>
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
                    {
                        (() => {
                            if (user.role === 'cr') {
                                return <a href="#section2" className="btnn"
                                    style={{ background: '#7cb9e8' }}>CR</a>
                            }
                            else {
                                return <a href="#section2" className="btnn"
                                    style={{ background: 'none' }}>CR</a>
                            }
                        })()
                    }
                    {
                        (() => {
                            if (user.role !== 'cr' && user.role !== null) {
                                return <a href="#section3" className="btnn"
                                    style={{ background: '#FFB0AD' }}>Club Moderator</a>
                            } else {
                                return <a href="#section3" className="btnn"
                                    style={{ background: 'none' }}>Club Moderator</a>
                            }
                        })()
                    }
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
                    <p className="p" style={{ margin: '20px', display: 'inline' }}>********</p>
                </div>

                <div className="c_s">
                    <a className="change" href="#" style={{ color: 'black' }}
                        onClick={handlePopupPass}
                    >Change</a>
                </div>

                <div className="all">
                    <p className="allow">Allow desktop notification:</p>
                    <input type="checkbox" className="chk" id="switch" />
                    <label className="labell" htmlFor="switch"></label>
                    <div className="s"></div>
                    <div className="background"></div>
                </div>
            </div>

            {user.role === 'cr' &&
                <div id="section2">
                    <form onSubmit={createGroupEvent}>
                        <h5 style={{
                            position: 'relative', left: '22%', height: '100%', width: '100%',
                            background: 'white'
                        }}>My Group</h5>
                        <div className="sec2">
                            <p style={{ position: 'relative', left: '5%' }}>Add Event:</p>
                            <div id="block">
                                <div id="roomblock" className="room">
                                    <select defaultValue={0} className="form-control custom-select" id="room"
                                        style={{ backgroundColor: 'white', border: 'none' }}
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
                                <div id="detailsblock" style={{ display: 'flex' }}>
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
            }

            {user.role !== 'cr' && user.role !== null &&
                <div id="section3">
                    <form onSubmit={createClubEvent}>
                        <h5 style={{
                            position: 'relative', left: '22%', height: '100%', width: '100%',
                            background: 'white'
                        }}>My Club</h5>
                        <div className="sec2">
                            <p style={{ position: 'relative', left: '5%' }}>Add Event:</p>
                            <div id="block">
                                <div id="roomblock" className="room">
                                    <select defaultValue={0} className="form-control custom-select" id="room"
                                        style={{ backgroundColor: 'white', border: 'none' }}
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
                                <div id="detailsblock" style={{ display: 'flex' }}>
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
            }

            <div id="section4">
                <h5 style={{ position: 'relative', left: '22%', top: '82.5px' }}>My Orders</h5>
                <div className="sec2">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Placed on</th>
                                <th scope="col">Product details</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr onClick={() => {setPopUpProduct(true); setItem(order.items[0].details);}}>
                                    <th scope="row">{order.order_id}</th>
                                    <td>{order.DOO}</td>
                                    <td colSpan="1">
                                        <table className="table mb-0">
                                            <tbody>
                                                <tr>
                                                    <td>{order.items[0].details.product_name}</td>
                                                    <td><img src={order.items[0].details.pic1_path} className='img-thumbnail' width='35' height='35' style={{ border: 'none' }} alt='' /></td>
                                                </tr>
                                                <tr>
                                                    <td>x{order.items[0].quantity}</td>
                                                    <td>{order.items[0].size}</td></tr>
                                            </tbody>
                                        </table>
                                    </td>
                                    <td>{order.amount}</td>
                                    <td>{order.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {popUp && <CR_verification setPopUp={setPopUp} setUser={user} />}
            {popUpProduct && <Product setPopUp={setPopUpProduct} setItem={item}  setUser={user} />}
            {popUpPass && <ChangePass setPopUpPass={setPopUpPass} setUser={user} />}
        </div >
    )
}

export default Profile