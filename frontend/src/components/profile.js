import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import { axiosJWT } from './header.js';
import ChangePass from './change_pass.js';
import CrVerification from './cr_verification.js';
import Product from './product.js';

import '../static/profile.css';


const Profile = () => {
    const [user, setUser] = useState('')
    const [event, setEvent] = useState({ place: '', room: '', date: '', time: '', details: '' });
    const [popUpCR, setPopUpCR] = useState(false);
    const [popUpPass, setPopUpPass] = useState(false);
    const [progs, setProgs] = useState([]);
    const [orders, setOrders] = useState('')
    const [item, setItem] = useState('')
    const [popUpProduct, setPopUpProduct] = useState(false);
    const [productOrder, setProductOrder] = useState([]);
    const [myproduct, setMyProduct] = useState([]);
    const [status, setStatus] = useState('');
    const [oid, setOID] = useState('');

    useEffect(() => {

        const prepareProfile = async () => {
            const token = ''
            await axiosJWT.get('http://localhost:5000/getuser', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
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

                    axios.post('http://localhost:5000/getmyproduct', {
                        seller_id: resp.data.student_id,
                    })
                        .then(function (ress2) {
                            if (ress2.status === 201) {
                                console.log('lol 2 ', ress2.data)
                                setMyProduct(ress2.data)
                            }
                        })

                    axios.post('http://localhost:5000/getproductorders', {
                        seller_id: resp.data.student_id,
                        status: status,
                        oid: oid
                    })
                        .then(function (ress) {
                            if (ress.status === 201) {
                                console.log('lol ', ress.data)
                                console.log(status)
                                console.log(oid)
                                setProductOrder(ress.data)
                            }
                        })
                })
                .catch(error => {
                    console.log(error);
                })
        }


        prepareProfile()
    }, []);


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
        setPopUpCR(true);
    }


    if (!user || !orders)
        return <div style={{ textAlign: 'center', lineHeight: '600px' }}><i className="fa-regular fa-circle fa-beat fa-3x"></i><i className="fa-solid fa-circle fa-beat fa-3x"></i><i className="fa-regular fa-circle fa-beat fa-3x"></i></div>
    return (
        <div style={{overflowX: 'hidden'}}>
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
                    <button style={{ color: 'black', position: 'relative', left: '20px' }} onClick={handlePopup}>Ask role access</button>
                </div>

                <div className="emm">
                    <p className="email" style={{ margin: '20px', display: 'inline' }}>Email: </p>
                    <p className="em" style={{ margin: '20px', display: 'inline' }}>{user.email}</p>
                </div>

                <div className="pp">
                    <p className="password" style={{ margin: '20px', display: 'inline' }}>Password:</p>
                    <p className="p" style={{ margin: '20px', display: 'inline' }}>********</p>
                    <button className="c_s" onClick={handlePopupPass}>Change</button>
                </div>

                <div className="all">
                    <p className="allow">Allow desktop notification:</p>
                    <input type="checkbox" className="chk" id="switch" onChange={()=>Notification.requestPermission()}/>
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
                                    <select defaultValue={0} className="form-control custom-select" id="room" style={{ backgroundColor: 'white', border: 'none' }} onChange={(e) => setEvent({ ...event, room: e.target.value })}>
                                        <option value={0} disabled>Select Room</option>
                                        {progs.map((p) => (
                                            <option key={p} value={p}>{p}</option>
                                        ))}
                                    </select>
                                </div>
                                <div id="placeblock" className="clc">

                                    <select defaultValue={0} className="form-control custom-select" id="place" style={{ backgroundColor: 'white', border: 'none' }} onChange={(e) => handleProg(e.target.value)}>
                                        <option value={0} disabled>Select Place</option>
                                        <option value="AB2">AB2</option>
                                        <option value="AB3">AB3</option>
                                    </select>
                                </div>

                                <div id="timeblock" className="d">
                                    <input type="date" style={{ backgroundColor: 'white', border: 'none' }} onChange={(e) => setEvent({ ...event, date: e.target.value })} />
                                </div>
                                <div id="timeblock" className="t">
                                    <input type="time" style={{ backgroundColor: 'white', border: 'none' }} className="start-time" onChange={(e) => setEvent({ ...event, time: e.target.value })} />
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
                                    <select defaultValue={0} className="form-control custom-select" id="room" style={{ backgroundColor: 'white', border: 'none' }} onChange={(e) => setEvent({ ...event, room: e.target.value })}>
                                        <option value={0} disabled>Select Room</option>
                                        {progs.map((p) => (
                                            <option key={p} value={p}>{p}</option>
                                        ))}
                                    </select>
                                </div>
                                <div id="placeblock" className="clc">

                                    <select defaultValue={0} className="form-control custom-select" id="place" style={{ backgroundColor: 'white', border: 'none' }}
                                        onChange={(e) => handleProg(e.target.value)}>
                                        <option value={0} disabled>Select Place</option>
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

            <div className="mb-5" id="section4">
                <h5 style={{ position: 'relative', left: '22%', marginTop: '5%', height: '100%', width: '100%', background: 'white' }}>My Orders</h5>
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
                                <tr key={order.order_id} onClick={() => { setPopUpProduct(true); setItem(order.items[0].details); }}>
                                    <th scope="row">{order.order_id}</th>
                                    <td>{order.DOO}</td>
                                    <td colSpan="1">
                                        <table className="table mb-0">
                                            <tbody>
                                                <tr>
                                                    <td>{order.items[0].details.product_name}</td>
                                                    <td><img src={order.items[0].details.pic1_path} className='img-thumbnail' width='70' height='70' style={{ border: 'none' }} alt='' /></td>
                                                </tr>
                                                <tr>
                                                    <td>{order.items[0].size}</td>
                                                    <td>x{order.items[0].quantity}</td>
                                                    </tr>
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

            <div id="#section5">
                <h5 style={{
                    position: 'relative', left: '22%', height: '100%', width: '100%',
                    background: 'white'
                }}>My Product</h5>
                <div className="sec2">
                    <table class="table table-hover table-responsive">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myproduct.map((m, i) => (
                                <tr>
                                    <th scope="row">{i + 1}</th>
                                    <td>{m.product_name}</td>
                                    <td>{m.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div id="#section6">
                <h5 style={{
                    position: 'relative', left: '22%', height: '100%', width: '100%',
                    background: 'white'
                }}>My Product(s) Orders</h5>
                <div className="sec2">
                    <table class="table table-hover table-responsive">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Buyer ID</th>
                                <th scope="col">Size</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Total Amount</th>
                                <th scope="col">Room No.</th>
                                <th scope="col">Contact No.</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productOrder.map((p, i) => (
                                <tr>
                                    <th scope="row">{i + 1}</th>
                                    <td>{p.items[0].details.product_name}</td>
                                    <td>{p.buyer_id}</td>
                                    <td>{p.items[0].size}</td>
                                    <td>{p.items[0].quantity}</td>
                                    <td>{p.amount}</td>
                                    <td>{p.shipping}</td>
                                    <td>{p.contact}</td>
                                    <td>
                                        <select defaultValue={0} className="form-control custom-select" id="status"
                                            style={{ backgroundColor: 'white', border: 'none' }}
                                            onChange={(e) => { setStatus(e.target.value); setOID(p.order_id) }}>
                                            <option value={0}>{p.status}</option>
                                            <option value="Processing">Processing</option>
                                            <option value="Canceled">Canceled</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {popUpCR && <CrVerification setPopUpCR={setPopUpCR} setUser={user} />}
            {popUpProduct && <Product setPopUpProduct={setPopUpProduct} setItem={item} setUser={user} />}
            {popUpPass && <ChangePass setPopUpPass={setPopUpPass} setUser={user} />}
        </div >
    )
}

export default Profile