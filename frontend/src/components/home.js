import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import '../static/home.css';
import homekids from '../static/homekids.svg';
import snake from '../static/snake.png';
import bag from '../static/backpack.svg';
import paint from '../static/palette.svg';
import shop from '../static/shopping.svg';

const Home = () => {
    const history = useHistory();
    const [post, setPosts] = useState('')
    const [text, setText] = useState('')
    const [image, setImage] = useState({ preview: '', data: '' })

    useEffect(() => {
        getPost();
    }, []);

    const getPost = async () => {
        const response = await axios.get('http://localhost:5000/getpost', {
        });
        setPosts(response.data);
    }

    const handleSubmit = async (e) => { }

    const handleFileChange = (e) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        }
        setImage(img)
    }


    const groupButton = async (e) => {
        e.preventDefault()
        history.push('./group');
    }
    const clubButton = async (e) => {
        e.preventDefault()
        history.push('./club');
    }
    const shopButton = async (e) => {
        e.preventDefault()
        history.push('./shop');
    }


    if (!post)
        return <div style={{ textAlign: 'center', lineHeight: '600px' }}><i class="fa-regular fa-circle fa-beat fa-3x"></i><i class="fa-solid fa-circle fa-beat fa-3x"></i><i class="fa-regular fa-circle fa-beat fa-3x"></i></div>
    return (
        <div className="container-fluid bg2">
            <div className="row m-5 pt-4">

                <div className="col-sm-8 p-3" style={{ backgroundColor: '#d9d9d9' }}>

                    {/* createpost */}
                    <div className='mb-3 p-3' style={{ backgroundColor: 'white' }}>
                        <form onSubmit={handleSubmit}>

                            <div style={{ display: 'flex', alignItems: 'center' }}><i className="fa fa-regular fa-pen-to-square fa-2x"></i>
                                <label style={{ width: '10px' }}></label>
                                <textarea row="3" className="form-control pr-5 mr-5" id="tess" placeholder="Whats on your mind?"></textarea>
                            </div>

                            <div>
                                {image.preview && <img src={image.preview} width='100' height='100' />}
                                <div className='text-end py-2'>
                                    <label htmlFor="photo1"><i className="fa fa-solid fa-image"></i>
                                        <input className="form-control" type="file" id="photo1" name='photo1' onChange={handleFileChange} style={{ display: 'none' }} />Photo</label>
                                    <label style={{ width: '15px' }}></label>
                                    <label htmlFor="attach1"><i className="fa fa-solid fa-paperclip"></i>
                                        <input className="form-control" type="file" id="attach1" name='attach1' style={{ display: 'none' }} multiple />Attach File</label>
                                </div>
                            </div>

                            <div className="text-end">
                                <button type="submit" className="btn">Post</button>
                            </div>
                        </form>
                    </div>


                    {/* display feed */}

                    <div className='mb-3 p-3' style={{ backgroundColor: 'white' }}>

                        <div>
                            <h4 className="card-title">@{post[0].username}</h4>
                            <p>{post[0].dop}</p>
                            <p className="card-text">{post[0].post_body}</p>
                            <img src={snake} alt="Card image"/>
                            <p></p>
                            <a href="#"> <i className="fa fa-regular fa-comment"></i></a>
                        </div>
                    </div>
                </div>


                <div className="col-sm-1"></div>
                <div className="col-sm-3" >

                    <div className='row p-0 marker' style={{ position: 'fixed', marginRight: '50px' }}>
                        <div className="card p-0">
                            <div className="card-body p-0">
                                <a className="btn cards m-0" onClick={groupButton} style={{ backgroundColor: 'var(--caramel)', }}><img src={bag} width="40" height="40" alt="logo" />  Group</a>
                            </div>
                        </div>
                        <div className="card mt-1 mb-1 p-0">
                            <div className="card-body p-0">
                                <a className="btn cards m-0" onClick={clubButton} style={{ backgroundColor: 'var(--vista)' }}><img src={paint} width="40" height="40" alt="logo" />  Clubs</a>
                            </div>
                        </div>
                        <div className="card p-0">
                            <div className="card-body p-0">
                                <a className="btn cards m-0" onClick={shopButton} style={{ backgroundColor: 'var(--melon)' }}><img src={shop} width="40" height="40" alt="logo" />  Shop</a>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <img className="bgprop" src={homekids} alt="kids" />
                    </div>
                </div>
            </div >

        </div >
    )
}

export default Home
