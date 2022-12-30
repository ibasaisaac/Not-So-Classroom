import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { axiosJWT } from './header.js';
import Edit from './edit_body.js';
import GroupCreate from './create_group.js';
import GroupJoin from './join_group.js';

import '../static/home.css';
import homekids from '../static/homekids.svg';
import bag from '../static/backpack.svg';
import paint from '../static/palette.svg';
import shop from '../static/shopping.svg';


const Home = () => {
    const [user, setUser] = useState('')
    const [posts, setPosts] = useState('')
    const [text, setText] = useState('')
    const [image, setImage] = useState([])
    const [file, setFile] = useState()
    const [commentText, setCommentText] = useState({ post_id: '', comment_body: '' })
    const [postEditPopUp, setPostEditPopUp] = useState(false);
    const [propToEdit, setPropToEdit] = useState(['', {}]);

    const [groupJoinPopUp, setGroupJoinPopUp] = useState(false);
    const [groupCreatePopUp, setGroupCreatePopUp] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {

        const prepareHomePage = async () => {
            const token = ''
            await axiosJWT.get('http://localhost:5000/getuser', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(function (res1) {
                    console.log('home', res1.data);
                    setUser(res1.data);
                    axios.post('http://localhost:5000/getpost', {
                        category: 'home',
                        category_id: 0
                    })
                        .then(function (res2) {
                            console.log('home posts', res2.data)
                            setPosts(res2.data);
                        })
                })
                .catch(error => {
                    console.log(error);
                });
        }

        prepareHomePage()
    }, []);


    const postSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.set('op_id', user.student_id)
        data.set('category', 'home');
        data.set('category_id', 0);
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
                toast.success(res.data.msg)
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
                        <li><button style={{ backgroundColor: 'transparent', border: '0' }}className="dropdown-item" onClick={() => { setPostEditPopUp(true); setPropToEdit(['p', props.flag[1].post]); }}>Edit</button></li>
                        <li><button style={{ backgroundColor: 'transparent', border: '0' }}className="dropdown-item" onClick={(e) => postDelete(e, props.flag[1].post.post_id)}>Delete</button></li>
                    </ul>
                </div>
            )
        }
        else if (props.flag[0] === 'c' && user.student_id === props.flag[1].comment.comment_op.student_id) {
            return (
                <div className='text-end me-3'>
                    <button style={{ backgroundColor: 'transparent', border: '0' }}className='anc' onClick={() => { setPostEditPopUp(true); setPropToEdit(['c', props.flag[1].comment]); }}>edit</button> &ensp;
                    <button style={{ backgroundColor: 'transparent', border: '0' }}className='anc' onClick={(e) => commentDelete(e, props.flag[1].comment.comment_id)} >delete</button>
                </div>
            )
        }
    };

    const groupButton = async (e) => {
        e.preventDefault()
        if (user.role === 'cr' && user.class_group.id===0) {
            setGroupCreatePopUp(true);
        }
        else if (user.class_group.id===0) {
            setGroupJoinPopUp(true);
        }
        else {
            navigate('/group');
        }
    }
    const clubButton = async (e) => {
        e.preventDefault()
        navigate('/clubmenu');
    }
    const shopButton = async (e) => {
        e.preventDefault()
        navigate('/shop');
    }

    if (!user || !posts)
        return <div style={{ textAlign: 'center', lineHeight: '600px' }}><i className="fa-regular fa-circle fa-beat fa-3x"></i><i className="fa-solid fa-circle fa-beat fa-3x"></i><i className="fa-regular fa-circle fa-beat fa-3x"></i></div>
    return (
        <div className="container-fluid p-0">
            <div className="bg2">
                <div className="row mx-5 py-4">

                    <div className="col-sm-8 p-3" style={{ backgroundColor: '#d9d9d9' }}>

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


                    <div className="col-sm-1"></div>
                    <div className="col-sm-3">
                        <div className='row p-0 marker' style={{ position: 'fixed', marginRight: '50px' }}>
                            <div className="card p-0">
                                <div className="card-body p-0">
                                    <button style={{ border: '0', backgroundColor: 'var(--caramel)' }} className="btn cards m-0" onClick={groupButton}><img src={bag} width="40" height="40" alt="logo" />  Group</button>
                                </div>
                            </div>
                            <div className="card mt-1 mb-1 p-0">
                                <div className="card-body p-0">
                                    <button style={{ border: '0', backgroundColor: 'var(--vista)' }} className="btn cards m-0" onClick={clubButton}><img src={paint} width="40" height="40" alt="logo" />  Clubs</button>
                                </div>
                            </div>
                            <div className="card p-0">
                                <div className="card-body p-0">
                                    <button style={{ border: '0', backgroundColor: 'var(--melon)' }} className="btn cards m-0" onClick={shopButton}><img src={shop} width="40" height="40" alt="logo" />  Shop</button>
                                </div>
                            </div>
                        </div>

                        <div className='row'>
                            <img className="bgprop" src={homekids} alt="kids" />
                        </div>
                    </div>

                </div>
                {postEditPopUp && <Edit setPostEditPopUp={setPostEditPopUp} setPropToEdit={propToEdit} />}
                {groupJoinPopUp && <GroupJoin setGroupJoinPopUp={setGroupJoinPopUp} setUser={user} />}
                {groupCreatePopUp && <GroupCreate setGroupCreatePopUp={setGroupCreatePopUp} setUser={user} />}
            </div>
        </div >
    )


}

export default Home