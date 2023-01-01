import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../static/shop.css';
import Product from './product';
import ProductCreate from './create_product';
import { axiosJWT } from './header.js';
import touristkid from '../static/touristkid.svg';

const Shop = () => {
    const [user, setUser] = useState('')
    const [products, setProducts] = useState('')
    const [item, setItem] = useState('')
    const [popUpProduct, setPopUpProduct] = useState(false);
    const [productCreatePopUp, setProductCreatePopUp] = useState(false);

    useEffect(() => {

        const prepareShopPage = async () => {
            const token = ''
            await axiosJWT.get('http://localhost:5000/getuser', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(function (res1) {
                    console.log('shop', res1.data);
                    setUser(res1.data);
                    axios.post('http://localhost:5000/getproduct', {
                        club_id: 0
                    })
                        .then(function (res2) {
                            console.log('shop products', res2.data)
                            setProducts(res2.data)
                        })
                })
                .catch(error => {
                    console.log(error);
                });
        }

        prepareShopPage();
    }, []);

    

    function addProduct() {
        setProductCreatePopUp(true);
    }

    function random_color() {
        var colors = ['var(--melon)', 'var(--caramel)', 'var(--crystal)', 'var(--vista)'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    if (!user || !products)
        return <div style={{ textAlign: 'center', lineHeight: '600px' }}><i className="fa-regular fa-circle fa-beat fa-3x"></i><i className="fa-solid fa-circle fa-beat fa-3x"></i><i className="fa-regular fa-circle fa-beat fa-3x"></i></div>
    return (
        <div className="container-fluid p-0">
            <div className="bg2">
                <i className="fa fa-solid fa-filter fa-2x" style={{ position: 'absolute', top: '12%', right: '2%' }}></i>
                <i className="fa fa-solid fa-plus fa-2x" onClick={addProduct} style={{ position: 'absolute', top: '12%', right: '5%' }}></i>

                <img className="bgshopprop" src={touristkid} alt="kid" />

                <div className="row row-cols-1 row-cols-md-4 mx-5 py-5">
                    {products.map((product) => (
                        <div className="p-3" key={`${product.product_id}`}>
                            <div className="card p-3" onClick={() => { setPopUpProduct(true); setItem(product); }} style={{ backgroundColor: random_color(), borderRadius: '0'}}>
                                <img alt='' src={product.pic1_path} width='auto' height='180px' className="card-img-top" />
                                <div className="card-body" style={{ height: '65px'}}>
                                    <h5 className="card-title text-center">{product.product_name}</h5>
                                    <p className="card-text text-center">{product.price + ' BDT'}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {popUpProduct && <Product setPopUpProduct={setPopUpProduct} setItem={item} setUser={user} />}
                {productCreatePopUp && <ProductCreate setProductCreatePopUp={setProductCreatePopUp} setUser={user} />}
            </div>
        </div >
    )
}

export default Shop
