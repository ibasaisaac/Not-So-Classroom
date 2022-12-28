import React, { useState } from 'react';
import { toast } from 'react-toastify';
import '../static/verification_pop.css';
import giraffe from '../static/giraffe.svg';
import birdies from '../static/birdies.svg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductCreate = props => {
    const setPopUp = props.setProductCreatePopUp
    const [user] = useState(props.setUser);
    const [msg, setMsg] = useState('');
    const [product, setProduct] = useState({ name: '', info: '', category: '', s_stock: '', m_stock: '', l_stock: '', total: '', price: '', pic: [] });
    const navigate = useNavigate();
    const [images, setImages] = useState([])

    const create = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.set('club_id', 0);
        data.set('seller_id', user.student_id);
        data.set('product_name', product.name);
        console.log(product.total)
        data.set('stock', parseInt(product.total) + parseInt(product.s_stock) + parseInt(product.m_stock) + parseInt(product.l_stock));
        data.set('s_stock', product.s_stock);
        data.set('m_stock', product.m_stock);
        data.set('l_stock', product.l_stock);
        data.set('price', product.price);
        data.set('info', product.info)
        Object.values(images).forEach(image => {
            data.append("files", image);
        });
        await axios.post('http://localhost:5000/addproduct', data)
            .then(res => {
                if (res.status === 200) {
                    setPopUp(false)
                    toast.success('Item added!', {
                        onClose: () => window.location.reload(true)
                    });
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    function Stock() {
        if (product.category === '1') {
            return <div className="col-sm-9">
                <input type="number" placeholder='S' required className="form-control" value={product.s_stock} onChange={(e) => setProduct({ ...product, s_stock: e.target.value })} />
                <input type="number" placeholder='M' required className="form-control" value={product.m_stock} onChange={(e) => setProduct({ ...product, m_stock: e.target.value })} />
                <input type="number" placeholder='L' required className="form-control" value={product.l_stock} onChange={(e) => setProduct({ ...product, l_stock: e.target.value })} />
                <input type="number" id="count" placeholder='Total' readOnly className="form-control" value={parseInt(product.s_stock) + parseInt(product.m_stock) + parseInt(product.l_stock)} onChange={(e) => setProduct({ ...product, total: e.target.value })} />
            </div>
        } else {
            return <div className="col-sm-9">
                <input type="number" id="count" placeholder='Total' required className="form-control" value={product.total} onChange={(e) => setProduct({ ...product, total: e.target.value })} />
            </div>
        };
    };

    const handleFileChange = (e) => {
        setImages(e.target.files)
    }

    return (
        <div className="container-fluid PopCreate" style={{ width: '66%', height: '99%', zIndex: '1051', top: '0%' }}>
            <button className="popup-x" onClick={() => setPopUp(false)} >X</button>

            <img alt='' className="giraffe" src={giraffe} />
            <img alt='' className="birdie" src={birdies} />

            <form className="form-containn_create mb-3" style={{ fontFamily: 'comfortaa' }} onSubmit={create} >

                <h3 className="text-center mb-2" style={{ fontFamily: 'marker', color: 'black', fontSize: '20px' }}>Enter product details</h3>

                <div className="form-group row mb-2">
                    <label htmlFor="name" className="col-sm-3 col-form-label">Product name</label>
                    <div className="col-sm-9">
                        <input type="text" required className="form-control" id="name" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} />
                    </div>
                </div>

                <div className="form-group row mb-2" >
                    <label htmlFor="category" className="col-sm-3 col-form-label">Category</label>
                    <div className="col-sm-9">
                        <select className="form-select" id='category' onChange={(e) => setProduct({ ...product, category: e.target.value })}>
                            <option>Choose..</option>
                            <option value={1}>Clothes</option>
                            <option value={2}>Others</option>
                        </select>
                    </div>
                </div>

                <div className="form-group row mb-2" >
                    <label htmlFor="count" className="col-sm-3 col-form-label">Stock</label>
                    <Stock />
                </div>


                <div className="form-group row mb-2" >
                    <label className="col-sm-3 col-form-label">Image (upto 3)</label>
                    <div className="col-sm-9">
                        <input className="form-control" required type="file" accept="image/*" multiple id="photo" onChange={handleFileChange} />
                        <div style={{ display: 'flex' }}>
                            {images && Array.from(images).map((image) => (
                                <div>
                                    {image && <img className='img-thumbnail' src={URL.createObjectURL(image)} width='50' height='50' alt='' />}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-2" >
                    <label htmlFor="info" className="col-sm-3 col-form-label">Additional details</label>
                    <div className="col-sm-9">
                        <textarea id="info" rows="2" style={{ resize: 'none' }} required className="form-control" onChange={(e) => setProduct({ ...product, info: e.target.value })} ></textarea>
                    </div>
                </div>

                <div className="form-group row mb-3" >
                    <label htmlFor="price" className="col-sm-3 col-form-label">Price</label>
                    <div className="col-sm-9">
                        <input type="number" id="price" required className="form-control" onChange={(e) => setProduct({ ...product, price: e.target.value })} />
                    </div>
                </div>

                <div className="form-group row text-center">
                    <div className="col-sm-12">
                        <button type="submit" className="btn btn-light btn-lg bt_modal" >Enter</button>
                    </div>
                </div>

            </form >



        </div >
    )


}
export default ProductCreate;