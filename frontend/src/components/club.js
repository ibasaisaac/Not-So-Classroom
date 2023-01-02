import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import { axiosJWT } from './header.js';
import Edit from './edit_body.js';
import Session from './session'
import '../static/club.css';
import pencilkid from '../static/pencilkid.svg';
import banner from '../static/default_banner.png';
import touristkid from '../static/touristkid.svg';
import Product from './product';
import ProductCreate from './create_product';


const Club = () => {
    const location = useLocation()
    const [user, setUser] = useState(location.state.club.members[0])
    const [club] = useState(location.state.club)
    const [mod, setMod] = useState('')
    const [members, setMembers] = useState('')
    const [posts, setPosts] = useState('')
    const [sessions, setSessions] = useState('')

    const [activityTab, setActivityTab] = useState(true)
    const [memberTab, setMemberTab] = useState(false)
    const [achievementTab, setAchievementTab] = useState(false)
    const [shopTab, setShopTab] = useState(false)

    const [text, setText] = useState('')
    const [image, setImage] = useState([])
    const [file, setFile] = useState()
    const [commentText, setCommentText] = useState({ post_id: '', comment_body: '' })

    const [postEditPopUp, setPostEditPopUp] = useState(false);
    const [propToEdit, setPropToEdit] = useState(['', {}]);
    const [sessionPopUp, setSessionPopUp] = useState(false);
    const [sessionDetails, setSessionDetails] = useState('');

    const [products, setProducts] = useState('')
    const [item, setItem] = useState('')
    const [popUpProduct, setPopUpProduct] = useState(false);
    const [productCreatePopUp, setProductCreatePopUp] = useState(false);


    useEffect(() => {
        const prepareClubPage = async () => {
            const token = ''
            await axiosJWT.get('http://localhost:5000/getuser', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(function (res) {
                    console.log('club', res.data);
                    setUser(res.data);

                    axios.post('http://localhost:5000/getmod', {
                        mod_id: club.moderator_id
                    }).then(function (res1) {
                        console.log('club mod', res1.data)
                        setMod(res1.data);

                        axios.post('http://localhost:5000/getmembers', {
                            club_id: club.club_id
                        })
                            .then(function (res2) {
                                console.log('club members', res2.data)
                                setMembers(res2.data);

                                axios.post('http://localhost:5000/getpost', {
                                    category: 'club_id',
                                    category_id: club.club_id
                                })
                                    .then(function (res3) {
                                        console.log('club posts', res3.data)
                                        setPosts(res3.data);
                                        axios.post('http://localhost:5000/getsession', {
                                            id: club.club_id
                                        })
                                            .then(function (res4) {
                                                console.log(res4.data)
                                                setSessions(res4.data);
                                            })
                                    })
                            })
                        axios.post('http://localhost:5000/getproduct', {
                            club_id: club.club_id
                        })
                            .then(function (res2) {
                                console.log('shop club products', res2.data)
                                setProducts(res2.data)
                            })

                    })
                })
                .catch(error => {
                    console.log(error);
                });
        }

        prepareClubPage();

    }, [club]);

    function addProduct() {
        setProductCreatePopUp(true);
    }

    const postSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.set('op_id', user.student_id);
        data.set('category', 'club_id');
        data.set('category_id', club.club_id);
        data.set('post_body', text);
        if (file) {
            data.append('files', file);
        }
        else {
            Object.values(image).forEach(img => {
                data.append("files", img);
            });
        }

        await axios.post('http://localhost:5000/post', data)
            .then(res => {
                if (res.status === 200) {
                    setText('')
                    setImage('')
                    setFile('')
                    toast.success('Post created!')
                    var newPosts = [res.data, ...posts]
                    setPosts(newPosts);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    const postDelete = async (e, props) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/del_post', {
                post_id: props
            });
            if (res.status === 200) {
                toast.success(res.data.msg);
                var newPosts = posts.filter((post) => props !== post.post_id);
                setPosts(newPosts);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const commentSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/comment', {
                post_id: commentText.post_id,
                op_id: user.student_id,
                comment_body: commentText.comment_body
            });
            if (res.status === 200) {
                setCommentText({ comment_body: '' })
                toast.success('Comment created!')
                var newPosts = posts.map((post) => {
                    if (post.post_id === commentText.post_id)
                        post.comments = [res.data, ...post.comments]
                    return post;
                })
                setCommentText({ post_id: '' })
                setPosts(newPosts);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const commentDelete = async (e, props) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/del_comment', {
                comment_id: props
            });
            if (res.status === 200) {
                toast.success(res.data.msg);
                var newPosts = posts.map((post) => {
                    post.comments = post.comments.filter((comment) => comment.comment_id !== props);
                    return post;
                })
                setPosts(newPosts);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    function Modify1(props) {
        if (props.flag[0] === 'p' && user.student_id === props.flag[1].post.post_op.student_id) {
            return (
                <div className="dropdown p-0 m-0" >
                    <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        <i className="fa fa-solid fa-ellipsis fa-lg"></i>
                    </button>
                    <ul className="dropdown-menu">
                        <li><button style={{ backgroundColor: 'transparent', border: '0' }} className="dropdown-item" onClick={() => { setPostEditPopUp(true); setPropToEdit(['p', props.flag[1].post]); }}>Edit</button></li>
                        <li><button style={{ backgroundColor: 'transparent', border: '0' }} className="dropdown-item" onClick={(e) => postDelete(e, props.flag[1].post.post_id)}>Delete</button></li>
                    </ul>
                </div>
            )
        }
        else if (props.flag[0] === 'c' && user.student_id === props.flag[1].comment.comment_op.student_id) {
            return (
                <div className='text-end me-3'>
                    <button style={{ backgroundColor: 'transparent', border: '0' }} className='anc' onClick={() => { setPostEditPopUp(true); setPropToEdit(['c', props.flag[1].comment]); }}>edit</button> &ensp;
                    <button style={{ backgroundColor: 'transparent', border: '0' }} className='anc' onClick={(e) => commentDelete(e, props.flag[1].comment.comment_id)} >delete</button>
                </div>
            )
        }
    };

    const color = useMemo(() => random_color(), []);
    function random_color() {
        var colors = ['var(--melon)', 'var(--caramel)', 'var(--crystal)', 'var(--vista)'];
        return colors[Math.floor(Math.random() * colors.length)];
    }


    function ActivityTab() {
        return (
            <div className="col-sm-7 p-3 inter" style={{ backgroundColor: '#d9d9d9' }}>
                {/* createpost */}
                <div className='mb-3 p-3' style={{ backgroundColor: 'white' }}>
                    <form onSubmit={postSubmit}>

                        <div style={{ display: 'flex', alignItems: 'center' }}><i className="fa fa-regular fa-pen-to-square fa-2x"></i>
                            <textarea rows="2" className="form-control mx-1" style={{ resize: 'none' }} placeholder="Whats on your mind?" value={text} onChange={(e) => setText(e.target.value)} ></textarea>
                        </div>

                        <div>
                            <div style={{ display: 'flex' }}>
                                {image && Array.from(image).map((img) => (
                                    <div key={img.name}>
                                        {img && <img className='img-thumbnail my-1' src={URL.createObjectURL(img)} width='100' height='100' alt='' />}
                                    </div>
                                ))}
                                {file && <p>{file.name}</p>}
                            </div>

                            <div className='text-end py-1'>
                                <label htmlFor="photo1"><i className="fa fa-solid fa-image"></i>
                                    <input className="form-control" type="file" id="photo1" accept="image/*" multiple onChange={(e) => { setImage(e.target.files) }} style={{ display: 'none' }} />Photo</label>
                                <label style={{ width: '15px' }}></label>
                                <label htmlFor="attach1"><i className="fa fa-solid fa-paperclip"></i>
                                    <input className="form-control" type="file" id="attach1" accept='application/pdf' onChange={(e) => { setFile(e.target.files[0]) }} style={{ display: 'none' }} />Attach File</label>
                            </div>
                        </div>

                        <div className="text-end mt-1">
                            <button type="submit" className="btn btn-primary" style={{ backgroundColor: 'var(--vista)' }}>Post</button>
                        </div>
                    </form>
                </div>

                {posts.map((post) => (

                    // displaypost
                    <div key={`${post.post_id}`} className='mb-2 px-3 pt-2' style={{ backgroundColor: 'white', boxShadow: '1px 1px 5px grey', position: 'relative' }}>

                        <div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img alt='' src={`${post.post_op.dp}`} className='img-thumbnail' width='50' height='50' style={{ border: 'none', borderRadius: '50px' }} />
                                <h5 >@{post.post_op.username}
                                    <p style={{ fontSize: '10px', color: 'grey', margin: '0' }}>{post.dop}</p>
                                </h5>
                                <p style={{ marginLeft: 'auto' }}></p>
                                <Modify1 flag={['p', { post }]} />
                            </div>

                            <p className='m-0'>{post.post_body}</p>
                            <div className="gallery">
                                {post.media.map((m) => (

                                    <a key={m.media_id} href={`${m.path}`} target="_blank" rel="noreferrer">
                                        {m.type === 'application/pdf' ?
                                            <iframe rel="preload" src={`${m.path}`} style={{ width: '500px', height: '300px' }} title={m.path} as="fetch" type="application/pdf" crossOrigin="true" ></iframe> :
                                            <img alt='' src={`${m.path}`} className="gallery_item" />}</a>

                                )
                                )}
                            </div>
                        </div>

                        <div className='py-4'>

                            {/* createcomment */}
                            <div className='mb-3'>
                                <form onSubmit={commentSubmit} style={{ display: 'flex', alignItems: 'center' }}>
                                    <i className="fa fa-regular fa-comment fa-lg ms-1"></i>
                                    <textarea rows="1" className="form-control ms-4 me-2" style={{ resize: 'none', borderRadius: '25px' }} onChange={(e) => setCommentText({ post_id: post.post_id, comment_body: e.target.value })} ></textarea>
                                    <button type="submit" style={{ border: 'none', backgroundColor: 'transparent' }} ><i className="fa fa-regular fa-paper-plane fa-lg me-1"></i></button>
                                </form>
                            </div>

                            {/* displaycomment */}
                            <div style={{ maxHeight: '114px', overflowY: 'auto' }}>
                                {post.comments.map((comment) => (
                                    <div className='m-1 px-3 py-1' key={`${comment.comment_id}`} style={{ backgroundColor: '#d9d9d9', borderRadius: '25px' }} >

                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <h6 >@{comment.comment_op.username}
                                                <small style={{ fontSize: '10px', color: 'grey', margin: '0' }}>&ensp;{comment.doc}</small>
                                            </h6>
                                            <p style={{ marginLeft: 'auto' }}></p>
                                        </div>

                                        <p className='m-0'>{comment.comment_body}</p>
                                        <Modify1 flag={['c', { comment }]} />
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        )
    }
    function MemberTab() {
        return (
            <div className="col-sm-7 p-3" >
                <div className="mod">
                    <p>Moderator</p>
                    <div className="mod1">
                        <p>{mod.username}</p>
                    </div>
                </div>

                <div className="peo mb-4">
                    <p>People</p>
                    {members.map((m, i = 1) => (
                        <div key={`${m.student_id}`} className="peo1">
                            <p>{i + 1}. {`${m.user.username}`}</p>
                        </div>
                    ))}
                </div>
            </div>)
    }
    function AchievementTab() {
        return (
            <div className="col-sm-7 p-3" >
                <div className="achi">
                    <p><b>SEC Inter University Junior</b></p>
                    <p><b>Programming Contest, 2022</b></p>

                    <div className="achi1">
                        <p><b>IUT_সংশপ্তক (3rd)</b></p>
                        <p>MemberTabs: A,B,C</p>
                        <p>Prize money: 10,000 BDT</p>
                    </div>
                </div>
            </div>)
    }
    function ShopTab() {
        return (<div className="col-sm-7 p-3" >
            <div className="container-fluid p-0">
                <div className="bg2">
                    <i className="fa fa-solid fa-filter fa-2x" style={{ position: 'absolute', top: '12%', right: '2%' }}></i>
                    <i className="fa fa-solid fa-plus fa-2x"
                        onClick={addProduct} 
                        style={{ position: 'absolute', top: '12%', right: '5%' }}></i>

                    {/* <img className="bgshopprop" src={touristkid} alt="kid" /> */}

                    <div className="row row-cols-1 row-cols-md-4 mx-5 py-5">
                        {products.map((product) => (
                        <div className="p-3" key={`${product.product_id}`}>
                            <div className="card p-3" 
                            onClick={() => { setPopUpProduct(true); setItem(product); }} style={{ backgroundColor: random_color(), borderRadius: '0'}}>
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
                {productCreatePopUp && <ProductCreate setProductCreatePopUp={setProductCreatePopUp} setUser={user} setMod={mod}/>}
                </div>
            </div >
        </div>)
    }



    if (!user || !posts || !sessions)
        return <div style={{ textAlign: 'center', lineHeight: '600px' }}><i className="fa-regular fa-circle fa-beat fa-3x"></i><i className="fa-solid fa-circle fa-beat fa-3x"></i><i className="fa-regular fa-circle fa-beat fa-3x"></i></div>
    return (
        <div className="container-fluid" style={{ overflowX: 'hidden' }}>
            <div className="bg2">
                <div className="mask">
                    <img className="mask" alt='banner' src={banner} />
                    <p className="iut"><b>{club.club_name}</b></p>
                </div>

                <div className="navbar r">
                    <nav className='v'>
                        <ul>
                            <li className='i'><button className='ibn' onClick={() => { setActivityTab(true); setMemberTab(false); setShopTab(false); setAchievementTab(false) }}>Activities</button></li>
                            <li className='i'><button className='ibn' onClick={() => { setMemberTab(true); setActivityTab(false); setShopTab(false); setAchievementTab(false) }}>Members</button></li>
                            <li className='i'><button className='ibn' onClick={() => { setShopTab(true); setActivityTab(false); setMemberTab(false); setAchievementTab(false) }}>Shops</button></li>
                            <li className='i'><button className='ibn' onClick={() => { setAchievementTab(true); setActivityTab(false); setMemberTab(false); setShopTab(false) }}>Achievements</button></li>
                        </ul>
                    </nav>
                </div>

                <div >
                    <div className='row mx-5 my-4'>
                        <img className="bgclubprop" src={pencilkid} alt="kid" />

                        {activityTab && <ActivityTab />}
                        {memberTab && <MemberTab />}
                        {shopTab && <ShopTab />}
                        {achievementTab && <AchievementTab />}

                        <div className="col-sm-1"></div>
                        <div className="col-sm-3">
                            <div className='sidebarr row p-3 m-1 marker'>
                                <h5>Upcoming</h5>
                                <h6 className=''>Sessions</h6>
                                {sessions.map((session) => (
                                    <div className="card p-0 mb-1" key={`${session.event_id}`}
                                        onClick={() => { setSessionPopUp(true); setSessionDetails(session) }}>
                                        <div className="card-body p-1 inter" style={{ backgroundColor: color, cursor: 'pointer' }}>
                                            <h5>{session.title}</h5>
                                            <small>{session.date}</small>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>




                {postEditPopUp && <Edit setPostEditPopUp={setPostEditPopUp} setPropToEdit={propToEdit} />}
                {sessionPopUp && <Session setSessionPopUp={setSessionPopUp} setSessionDetails={sessionDetails} setUser={user} />}
            </div >
        </div>
    )
}

export default Club
