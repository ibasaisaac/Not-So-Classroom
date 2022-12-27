import React, { useState } from 'react';
import { toast } from 'react-toastify';
import '../static/product.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Product = props => {
    const { setPopUp } = props;
    const [item] = useState(props.setItem)
    const [user] = useState(props.setUser);
    const [size, setSize] = useState('S_stock');
    const [quantity, setQuantity] = useState(0);
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [setMsg] = useState('');
    console.log(quantity)

    const Buy = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/buy', {
            buyer_id: user.student_id,
            amount: quantity * item.price,
            shipping: address,
            contact: phone,
            product_id: item.product_id,
            size: size[0],
            quantity: quantity
        })
            .then(res => {
                if (res.status === 200) {
                    setPopUp(false);
                    window.location.reload(true)
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

                <div className="row">

                    <div className="col-md-8">

                        <div className="col"><h4><b>Basket</b></h4></div>

                        <div className="row border-top border-bottom mt-3">

                            <div className="row align-items-center">
                                <div className="col-2"><img alt='' className="img-fluid" src={item.pic3_path} /></div>
                                <div className="col">{item.product_name}     {size[0]}</div>
                                <div className="col">
                                    {(quantity > 1) ? <button onClick={() => setQuantity(quantity - 1)}> - </button> : <button disabled> - </button>}
                                    <label>{quantity}</label>
                                    {(quantity < item[size]) ? <button onClick={() => setQuantity(quantity + 1)}> + </button> : <button disabled> + </button>}
                                </div>
                                <div className="col">BDT {item.price} <span className="" ><a onClick={() => setQuantity(0)}>&#10005;</a></span></div>
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
                        <div className="row mb-5">
                            <div className="col">Total</div>
                            <div className="col text-right">BDT {quantity * item.price}</div>
                        </div>
                        <form onSubmit={Buy}>
                            <label>Room No.
                                <input id="room" placeholder="NH-102" value={address} onChange={(e) => setAddress( e.target.value)}/></label>
                            <label>Contact no.
                                <input id="code" placeholder="+880" value={phone} onChange={(e) => setPhone(e.target.value)}/></label>
                            <label className="mt-3">Payment method
                                <p>
                                    <input className="form-check-input" name='payment' type="radio" selected/>Cash on Delivery
                                    &ensp;
                                    {/* <input className="form-check-input" name='payment' type="radio" />bKash */}
                                </p>
                            </label>
                            <div className='text-center m-3'>
                            <button className="btn btn-lg btn-primary">Checkout</button></div>
                        </form>
                        
                    </div>

                </div>
            </div >)
    }
    else {

        return (
            <div className="container-fluid PopUpp">
                <button className="popup-x" onClick={() => setPopUp(false)} >X</button>
                <div className='row m-0' style={{ position: 'absolute', top: '15%' }}>
                    <div className='col-sm-5'>
                        <div id="carouselExampleDark" className="carousel carousel-dark slide m-0 p-0" data-bs-ride="carousel" style={{ border: '1px solid black', height: '200px', width: '200px' }}>
                            <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active"></button>
                            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div> 
                            <div className="carousel-inner">
                                <div className="carousel-item active" data-bs-interval="3000">
                                    <img alt='' src={item.pic1_path} className="d-block w-100" />
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
                    <div className='col-sm-1'></div>
                    <div className='col-sm-5'>
                        <h5>{item.product_name}</h5>
                        <h6>{item.price}</h6>

                        <p>{item.product_info}</p>
                        {item.stock &&
                            <div className="form-group">
                                <select required className="form-control" style={{ overflow: 'none' }} onChange={(e) => setSize(e.target.value)}>
                                    {item.S_stock === 0 && <option disabled>S - Out of stock</option>}
                                    {item.S_stock > 0 && <option value={'S_stock'}>S - {item.S_stock} items left</option>}
                                    {item.M_stock === 0 && <option disabled>M - Out of stock</option>}
                                    {item.M_stock > 0 && <option value={'M_stock'}>M - {item.M_stock} items left</option>}
                                    {item.L_stock === 0 && <option disabled>L - Out of stock</option>}
                                    {item.L_stock > 0 && <option value={'L_stock'}>L - {item.L_stock} items left</option>}
                                </select>
                            </div>}
                        <div className="text-center mt-5">
                            <button type="submit" className="btn btn-light btn-lg bt_modal" onClick={() => { setIsOpen(true); setQuantity(1) }} >Buy now</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Product;