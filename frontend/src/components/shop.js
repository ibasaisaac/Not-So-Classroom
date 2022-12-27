import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../static/shop.css';
import Product from './product';
import ProductCreate from './create_product';

import touristkid from '../static/touristkid.svg';

const Shop = () => {
    const [user, setUser] = useState('')
    const [products, setProducts] = useState('')
    const [item, setItem] = useState('')
    const [popUp, setPopUp] = useState(false);
    const [productCreatePopUp, setProductCreatePopUp] = useState(false);

    useEffect(() => {
        prepareShopPage();
    }, []);

    const prepareShopPage = async () => {
        await axios.get('http://localhost:5000/getuser', {
        })
            .then(function (res1) {
                console.log(res1.data);
                setUser(res1.data);
                axios.post('http://localhost:5000/getproduct', {
                    club_id: 0
                })
                    .then(function (res2) {
                        console.log(res2.data)
                        setProducts(res2.data)
                    })
            })
            .catch(error => {
                console.log(error);
            });
    }


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
        <div className="container-fluid bg2">
            <i className="fa fa-solid fa-filter fa-2x" style={{ position: 'absolute', top: '1%', right: '8%' }}></i>
            <i className="fa fa-solid fa-plus fa-2x" onClick={addProduct} style={{ position: 'absolute', top: '1%', right: '4%' }}></i>

            <img className="bgshopprop" src={touristkid} alt="kid" />

            <div className="row row-cols-1 row-cols-md-4 g-4 m-5">
                 {products.map((product) => (
                    <div className="col" key={`${product.product_id}`}>
                        <div className="card h-100 p-3" onClick={() => {setPopUp(true); setItem(product);}} style={{ backgroundColor: random_color(), borderRadius: '0' }}>
                            <img alt='' src={product.pic1_path} width='auto' height='230px' className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title text-center">{product.price + 'BDT'}</h5>
                                <small className="card-text text-center">{product.product_name}</small>
                            </div>
                        </div>
                    </div>
                ))} 
            </div>

            {popUp && <Product setPopUp={setPopUp} setItem={item}  setUser={user} />}
            {/* {popUp && <Product setPopUp={setPopUp} setItem={item}/>} */}
            {productCreatePopUp && <ProductCreate setProductCreatePopUp={setProductCreatePopUp}  setUser={user}/>}
       
        </div >
    )
}

export default Shop
