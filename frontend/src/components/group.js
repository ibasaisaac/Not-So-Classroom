import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import { axiosJWT } from './header.js';
import Edit from './edit_body.js';

import '../static/home.css';
import abckid from '../static/abckid.svg';


const Group = () => {
    const [user, setUser] = useState('')
    const [group, setGroup] = useState({ id: '', name: '' })
    const [posts, setPosts] = useState('')
    const [events, setEvents] = useState('')
    const [quizzes, setQuizzes] = useState('')

    const [text, setText] = useState('')
    const [image, setImage] = useState([])
    const [file, setFile] = useState()
    const [commentText, setCommentText] = useState({ post_id: '', comment_body: '' })
    const [postEditPopUp, setPostEditPopUp] = useState(false);
    const [propToEdit, setPropToEdit] = useState(['', {}]);
    const [cardPop, setCardPop] = useState(false);
    const [searchPop, setSearchPop] = useState(false);
    const [routinePop, setRoutinePop] = useState(false);
    const [sched, setSched] = useState([]);
    const [e, setE] = useState([]);
    const [cardDetails, setCardDetails] = useState('');
    const [param, setParam] = useState({ building: '', room: '', date: '' });


    useEffect(() => {

        const prepareGroupPage = async () => {
            const token = ''
            await axiosJWT.get('http://localhost:5000/getuser', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(function (res1) {
                    console.log('group', res1.data);
                    setUser(res1.data);
                    setGroup({id:res1.data.class_group, name: res1.data.group_name});
                    axios.post('http://localhost:5000/getpost', {
                        category: 'group_id',
                        category_id: res1.data.class_group
                    })
                        .then(function (res2) {
                            console.log('group posts', res2.data)
                            setPosts(res2.data);
                            axios.post('http://localhost:5000/getevent', {
                                id: res1.data.class_group
                            })
                                .then(function (res3) {
                                    console.log(res3.data)
                                    setQuizzes(res3.data.quiz);
                                    setEvents(res3.data.event);
                                })
                        })
                })
                .catch(error => {
                    console.log(error);
                });
        }

        prepareGroupPage();
    }, []);


    const postSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.set('op_id', user.student_id);
        data.set('category', 'group_id');
        data.set('category_id', group.id);
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

    const search = async (e) => {
        console.log(param)
        e.preventDefault();
        console.log(param)
        await axios.post('http://localhost:5000/search', {
            building: param.building,
            room: param.room,
            date: param.date
        })
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data.results)
                    setSched(
                        [{ slot: res.data.results.p1_slot, course: res.data.results.p1_course, group: res.data.results.p1_group_details, info: res.data.results.p1_info },
                        { slot: res.data.results.p2_slot, course: res.data.results.p2_course, group: res.data.results.p2_group_details, info: res.data.results.p2_info },
                        { slot: res.data.results.p3_slot, course: res.data.results.p3_course, group: res.data.results.p3_group_details, info: res.data.results.p3_info },
                        { slot: res.data.results.p4_slot, course: res.data.results.p4_course, group: res.data.results.p4_group_details, info: res.data.results.p4_info },
                        { slot: res.data.results.p5_slot, course: res.data.results.p5_course, group: res.data.results.p5_group_details, info: res.data.results.p5_info },
                        { slot: res.data.results.p6_slot, course: res.data.results.p6_course, group: res.data.results.p6_group_details, info: res.data.results.p6_info }]
                        )
                        setE(res.data.e)
                }
            })
            .then(() => {
                setSearchPop(true)
            })
            .catch(error => {
                console.log(error);
            });
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
    const color2 = useMemo(() => random_color(), []);
    function random_color() {
        var colors = ['var(--melon)', 'var(--caramel)', 'var(--crystal)', 'var(--vista)'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    if (!user || !posts || !events)
        return <div style={{ textAlign: 'center', lineHeight: '600px' }}><i className="fa-regular fa-circle fa-beat fa-3x"></i><i className="fa-solid fa-circle fa-beat fa-3x"></i><i className="fa-regular fa-circle fa-beat fa-3x"></i></div>
    return (
        <div className="container-fluid p-0">
            <div className="bg2">

                <div className="row mx-5 py-4">

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


                    <div className="col-sm-1"></div>
                    <div className="col-sm-3">
                        <div className='row'>
                            <img className="bggroupprop" src={abckid} alt="kid" />
                        </div>
                        <div className='sidebar row p-3 m-1 marker'>
                            <h2 className='text-center'>{group.name}</h2>
                            <h5>Upcoming</h5>
                            <h6 className='mt-2'>Quizzes</h6>
                            {quizzes.map((quiz) => (
                                <div className="card p-0 mb-1" key={`${quiz.event_id}`} onClick={() => { setCardPop(true); setCardDetails(quiz) }}>
                                    <div className="card-body p-1 inter" style={{ backgroundColor: color, cursor: 'pointer' }}>
                                        {/* <a className="btn classcards m-0" }}> Group</a> */}
                                        <h5>{quiz.title}</h5>
                                        <small>{quiz.date}</small> &ensp; <small>{quiz.place}</small>
                                    </div>
                                </div>
                            ))}

                            <h6 className='mt-2'>Events</h6>
                            {events.map((event) => (
                                <div className="card p-0 mb-1" key={`${event.event_id}`} onClick={() => { setCardPop(true); setCardDetails(event) }}>
                                    <div className="card-body p-1 inter" style={{ backgroundColor: color2, cursor: 'pointer' }}>
                                        <h6>{event.title}</h6>
                                        <small>{event.date}</small> &ensp; <small>{event.place}</small>
                                    </div>
                                </div>
                            ))}

                            <h5 className='mt-3'>Schedule</h5>

                            <h6 className='mt-2' onClick={() => setRoutinePop(true)} style={{ cursor: 'pointer' }}>Class Schedule</h6>
                            <div style={{ display: 'flex', justifyContent: 'space-evenly', fontFamily: 'inter' }}>
                                <select defaultValue={0} className="form-control custom-select p-0" style={{ backgroundColor: 'transparent', border: 'none', fontSize: '12px' }} onChange={(e) => setParam({ ...param, building: e.target.value })}>
                                    <option value="0" disabled>Building</option>
                                    <option value="AB2">AB2</option>
                                    <option value="AB3">AB3</option>
                                </select>
                                <select defaultValue={0} className="form-control custom-select p-0" style={{ backgroundColor: 'transparent', border: 'none', fontSize: '12px' }} onChange={(e) => setParam({ ...param, room: e.target.value })}>
                                    <option value="0" disabled>Room</option>
                                    <option value="105">105</option>
                                    <option value="106">106</option>
                                    <option value="205">205</option>
                                    <option value="301">301</option>
                                    <option value="302">302</option>
                                    <option value="304">304</option>
                                    <option value="508">508</option>
                                    <option value="510">510</option>
                                    <option value="LAB2">LAB2</option>
                                    <option value="ALB4">LAB4</option>
                                    <option value="LAB5">LAB5</option>
                                    <option value="LAB6">LAB6</option>
                                </select>
                                <input type="date" className="form-control p-0" style={{ backgroundColor: 'transparent', border: 'none', fontSize: '12px' }} onChange={(e) => setParam({ ...param, date: e.target.value })} />

                                <button type='submit' style={{ backgroundColor: 'transparent', fontSize: '14px', marginLeft: '7px' }} onClick={search}>Search</button>
                            </div>
                        </div>


                    </div>

                </div>
                {postEditPopUp && <Edit setPostEditPopUp={setPostEditPopUp} setPropToEdit={propToEdit} />}

                {cardPop && <div>
                    <div className='modal-backdrop' onClick={() => setCardPop(false)}></div>
                    <div className="card PopEvent" key={`${cardDetails.event_id}`} style={{ zIndex: '1050' }}>
                        <div className="card-body p-2 inter" style={{ backgroundColor: color, width: '100%' }}>
                            <h4>{cardDetails.title}</h4>
                            <small>{cardDetails.date}</small>  &ensp; <small>{cardDetails.place}</small>
                            <p></p>
                            <p>{cardDetails.info}</p>
                        </div>
                    </div>
                </div>}

                {routinePop && <div>
                    <div className='modal-backdrop' onClick={() => setRoutinePop(false)}></div>
                    <div className="card PopEvent" key={`${cardDetails.event_id}`} style={{ zIndex: '1050', position: 'absolute', left: '20%', top: '5%' }}>
                        <div className="card-body p-2 inter" style={{ backgroundColor: color, width: '820px' }}>
                            <h4 className='text-center'>Class routine</h4>
                            <img src={'http://localhost:5000/uploads/routine' + group.id + '.jpg'} width='800px' alt='' />
                        </div>
                    </div>
                </div>}

                {searchPop && <div>
                    <div className='modal-backdrop' onClick={() => setSearchPop(false)}></div>
                    <div className="card PopEvent" key={`${cardDetails.event_id}`} style={{ zIndex: '1050',top:'15%'}}>
                        <div className="card-body p-2 inter" style={{ backgroundColor: color, width: '100%' }}>
                            <h4 className='text-center'>{param.building} {param.room} on {param.date}</h4>
                            {/* <small>{cardDetails.date}</small>  &ensp; <small>{cardDetails.place}</small>  */}
                            <p></p>
                            {sched.map((s) => (
                                <div key={s.slot}>
                                    {s.slot && <p>{s.slot} {'->'}  {s.course} {s.group && <label>{s.group.prog}{s.group.section}</label>} {s.info}</p>}
                                </div>
                            ))}
                            {e.map((s) => (
                                <div key={s.event_id}>
                                    {<p>{s.date.substring(12,17)} {'->'}  {s.title} {s.info}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>}
            </div>
        </div >
    )
}

export default Group
