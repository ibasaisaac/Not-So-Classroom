import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import '../static/product.css';


const Product = props => {
    const setPopUp = props.setPopUpProduct;
    const [item] = useState(props.setItem)
    const [user] = useState(props.setUser);
    const [size, setSize] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const Buy = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/buy', {
            buyer_id: user.student_id,
            amount: quantity * item.price,
            shipping: address,
            contact: phone,
            product_id: item.product_id,
            size: size,
            quantity: quantity
        })
            .then(res => {
                if (res.status === 200) {
                    setPopUp(false);
                    toast.success("Order placed!");
                }
            })
            .catch(error => {
                console.log(error);
            });
    }



    if (isOpen === true) {
        return (
            <div className="container-fluid PopUpp">
                <button className="popup-x" onClick={() => setPopUp(false)} >X</button>

                <div className="row mt-1">

                    <div className="col-md-8">

                        <div className="col"><h4><b>Basket</b></h4></div>

                        <div className="row border-top border-bottom mt-3 py-1">

                            <div className="row align-items-center">
                                <div className="col-3"><img alt='' className="img-fluid" src={item.pic1_path} /></div>

                                {size ? <div className="col">{item.product_name}   {size[0]}</div> : <div className="col">{item.product_name}</div>}
                                {size ?
                                    <div className="col">
                                        {(quantity > 1) ? <button onClick={() => setQuantity(quantity - 1)}> - </button> : <button disabled> - </button>}
                                        <label>{quantity}</label>
                                        {(quantity < item[size]) ? <button onClick={() => setQuantity(quantity + 1)}> + </button> : <button disabled> + </button>}
                                    </div> :
                                    <div className="col">
                                        {(quantity > 1) ? <button onClick={() => setQuantity(quantity - 1)}> - </button> : <button disabled> - </button>}
                                        <label>{quantity}</label>
                                        {(quantity < item.stock) ? <button onClick={() => setQuantity(quantity + 1)}> + </button> : <button disabled> + </button>}
                                    </div>}

                                <button className="col" style={{ backgroundColor: 'transparent', border: '0' }} onClick={() => setIsOpen(false)}>BDT {item.price} &#10005;</button>
                            </div>

                        </div>
                    </div>

                    <div className="col-md-4 pt-2" style={{ backgroundColor: '#d9d9d9' }}>
                        <div><h5><b>Summary</b></h5></div>
                        <hr />
                        <div className="row mb-3">
                            <div className="col">Items &#10005;{quantity}</div>
                            <div className="col text-right">BDT {item.price}</div>
                        </div>
                        <hr />
                        <div className="row mb-3">
                            <div className="col">Total</div>
                            <div className="col text-right">BDT {quantity * item.price}</div>
                        </div>
                        <form onSubmit={Buy}>
                            <label>Room No.
                                <input id="room" required placeholder="NH-102" value={address} onChange={(e) => setAddress(e.target.value)} /></label>
                            <label>Contact no.
                                <input id="code" required placeholder="+880" pattern=".{11}" title="11 digits phone number" value={phone} onChange={(e) => setPhone(e.target.value)} /></label>
                            <label className="mt-3">Payment method
                                <p>
                                    <input className="form-check-input" name='payment' type="radio" selected />Cash on Delivery
                                    &ensp;
                                    {/* <input className="form-check-input" name='payment' type="radio" />bKash */}
                                </p>
                            </label>
                            <div className='text-center m-3'>
                                <button className="btn btn-light btn-lg bt_modal">Checkout</button></div>
                        </form>

                    </div>

                </div>
            </div >)
    }

    else {
        return (
            <div className="container-fluid PopUpp">
                <button className="popup-x" onClick={() => setPopUp(false)} >X</button>
                <div className='row w-100' style={{ position: 'absolute', top: '15%' }}>
                    <div className='col-lg-4 ms-5' >
                        <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel" style={{ border: '1px solid black', height: '250px', width: '250px' }}>
                            <div className="carousel-indicators">
                                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active"></button>
                                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
                            </div>
                            <div className="carousel-inner">
                                <div className="carousel-item active" data-bs-interval="3000">
                                    <img alt='' src={item.pic1_path} className="d-block d-100" style={{ height: '250px', width: '250px' }} />
                                    <div className="carousel-caption d-none d-md-block">
                                    </div>
                                </div>
                                <div className="carousel-item" data-bs-interval="3000">
                                    <img alt='' src={item.pic2_path} className="d-block w-100" />
                                    <div className="carousel-caption d-none d-md-block">
                                    </div>
                                </div>
                                <div className="carousel-item" >
                                    <img alt='' src={item.pic3_path} className="d-block w-100" />
                                    <div className="carousel-caption d-none d-md-block">
                                    </div>
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                    <div className='col-lg-2' ></div>
                    <div className='col-lg-4 me-2'>
                        <h5>{item.product_name}</h5>
                        <h6>BDT {item.price}</h6>

                        <p className='mb-5'>{item.product_info}</p>

                        {item.stock === 0 &&
                            <div className="form-group">
                                <select defaultValue={0} required className="form-control" style={{ overflow: 'none' }}>
                                    {<option value={0} disabled>Out of stock</option>}
                                </select>
                            </div>}

                        {(item.stock !== 0) && (item.S_stock === 0) && (item.M_stock === 0) && (item.L_stock === 0) &&
                            <div className="form-group">
                                <select required className="form-control" style={{ overflow: 'none' }}>
                                    {<option value={item.stock}>{item.stock} items left</option>}
                                </select>
                            </div>}

                        {((item.S_stock > 0) || (item.M_stock > 0) || (item.L_stock > 0)) &&
                            <div className="form-group">
                                <select defaultValue={""} required className="form-control" style={{ overflow: 'none' }} onChange={(e) => setSize(e.target.value)}>
                                    <option value="" disabled>Choose size: </option>
                                    {item.S_stock === 0 && <option value="" disabled>S - Out of stock</option>}
                                    {item.S_stock > 0 && <option value={'S_stock'}>S - {item.S_stock} items left</option>}
                                    {item.M_stock === 0 && <option value="" disabled>M - Out of stock</option>}
                                    {item.M_stock > 0 && <option value={'M_stock'}>M - {item.M_stock} items left</option>}
                                    {item.L_stock === 0 && <option value="" disabled>L - Out of stock</option>}
                                    {item.L_stock > 0 && <option value={'L_stock'}>L - {item.L_stock} items left</option>}
                                </select>
                            </div>}

                        <div className="text-center mt-5">
                            {item.stock === 0 && <button disabled type="submit" className="btn btn-light btn-lg bt_modal" onClick={() => { setIsOpen(true); setQuantity(1) }} >Buy now</button>}
                            {item.stock !== 0 && <button type="submit" className="btn btn-light btn-lg bt_modal" onClick={() => { setIsOpen(true); setQuantity(1) }} >Buy now</button>}
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}


export default Product;