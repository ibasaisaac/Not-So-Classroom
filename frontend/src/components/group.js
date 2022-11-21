import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import '../static/group.css';
import Edit from './edit_body';
import { toast } from 'react-toastify';

import abckid from '../static/abckid.svg';

const Group = () => {
    const [user, setUser] = useState('')
    const [group_id, setID] = useState('')
    const [posts, setPosts] = useState('')
    const [events, setEvents] = useState('')
    const [quizzes, setQuizzes] = useState('')

    const [text, setText] = useState('')
    const [image, setImage] = useState({ preview: '', data: '' })
    const [commentText, setCommentText] = useState({ post_id: '', comment_body: '' })
    const [popUp, setPopUp] = useState(false);
    const [propToEdit, setPropToEdit] = useState(['', {}]);
    const [cardPop, setCardPop] = useState(false);
    const [searchPop, setSearchPop] = useState(false);
    const [routinePop, setRoutinePop] = useState(false);
    const [slot, setSlot] = useState([]);
    const [cardDetails, setCardDetails] = useState('');
    const [param, setParam] = useState({ building: '', room: '', day: '' });


    useEffect(() => {
        prepareGroupPage();
    }, []);

    const prepareGroupPage = async () => {

        await axios.get('http://localhost:5000/getuser', {
        })
            .then(function (res1) {
                console.log(res1.data);
                setUser(res1.data);
                setID(res1.data.class_group);
                axios.post('http://localhost:5000/getpost', {
                    category: 'group_id',
                    category_id: res1.data.class_group
                })
                    .then(function (res2) {
                        console.log(res2.data)
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

        // const projects = response.data.value;
        // const promises = projects.map(project =>
        //     axios.get('http://localhost:5000/getuser', {})
        // );

        // const results = await axios.all(promises)

        // console.log(results);
    }

    const postSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.set('op_id', user.student_id);
        data.set('category', 'group');
        data.set('category_id', group_id);
        data.set('post_body', text);
        data.append('file', image.data);

        await axios.post('http://localhost:5000/post', data)
            .then(res => {
                if (res.status === 200) {
                    setText('')
                    setImage('')
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
                setCommentText({ post_id: '', comment_body: '' })
                toast.success('Comment created!')

                var newPosts = posts.map((post) => {
                    post.comments = [res.data, ...post.comments]
                    return post;
                })
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
        await axios.post('http://localhost:5000/search', {
            building: param.building,
            room: param.room,
            day: param.day
        })
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data)
                    setSlot([{ slot: res.data.p1_slot, course: res.data.p1_course, group: res.data.p1_group_details, info: res.data.p1_info },
                    { slot: res.data.p2_slot, course: res.data.p2_course, group: res.data.p2_group_details, info: res.data.p2_info },
                    { slot: res.data.p3_slot, course: res.data.p3_course, group: res.data.p3_group_details, info: res.data.p3_info },
                    { slot: res.data.p4_slot, course: res.data.p4_course, group: res.data.p4_group_details, info: res.data.p4_info },
                    { slot: res.data.p5_slot, course: res.data.p5_course, group: res.data.p5_group_details, info: res.data.p5_info },
                    { slot: res.data.p6_slot, course: res.data.p6_course, group: res.data.p6_group_details, info: res.data.p6_info }])

                }
            })
            .then(() => {
                setSearchPop(true)
            })
            .catch(error => {
                console.log(error);
            });
    }

    const handleFileChange = (e) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        }
        setImage(img)
    }

    function Modify1(props) {
        if (props.flag[0] === 'p' && user.student_id === props.flag[1].post.post_op.student_id) {
            return (
                <div className="dropdown p-0 m-0" >
                    <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        <i className="fa fa-solid fa-ellipsis fa-lg"></i>
                    </button>
                    <ul className="dropdown-menu">
                        <li><a href='/#' className="dropdown-item" onClick={() => { setPopUp(true); setPropToEdit(['p', props.flag[1].post]); }}>Edit</a></li>
                        <li><a href='/#' className="dropdown-item" onClick={(e) => postDelete(e, props.flag[1].post.post_id)}>Delete</a></li>
                    </ul>
                </div>
            )
        }
        else if (props.flag[0] === 'c' && user.student_id === props.flag[1].comment.comment_op.student_id) {
            return (
                <div className='text-end me-3'>
                    <a href='/#' className='anc' onClick={() => { setPopUp(true); setPropToEdit(['c', props.flag[1].comment]); }}>edit</a> &ensp;
                    <a href='/#' className='anc' onClick={(e) => commentDelete(e, props.flag[1].comment.comment_id)} >delete</a>
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
        <div className="container-fluid">

            <div className="row mx-5 my-4">

                <div className="col-sm-7 p-3 inter" style={{ backgroundColor: '#d9d9d9' }}>

                    {/* createpost */}
                    <div className='mb-3 p-3' style={{ backgroundColor: 'white' }}>
                        <form onSubmit={postSubmit}>

                            <div style={{ display: 'flex', alignItems: 'center' }}><i className="fa fa-regular fa-pen-to-square fa-2x"></i>
                                <textarea rows="2" className="form-control mx-1" style={{ resize: 'none' }} placeholder="Whats on your mind?" value={text} onChange={(e) => setText(e.target.value)} ></textarea>
                            </div>

                            <div>
                                {image.preview && <img className='img-thumbnail mx-5 my-1' src={image.preview} width='100' height='100' alt='' />}
                                <div className='text-end py-1'>
                                    <label htmlFor="photo1"><i className="fa fa-solid fa-image"></i>
                                        <input className="form-control" type="file" id="photo1" onChange={handleFileChange} style={{ display: 'none' }} />Photo</label>
                                    <label style={{ width: '15px' }}></label>
                                    <label htmlFor="attach1"><i className="fa fa-solid fa-paperclip"></i>
                                        <input className="form-control" type="file" id="attach1" style={{ display: 'none' }} />Attach File</label>
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
                                    <img src={`${post.post_op.dp}`} className='img-thumbnail' width='50' height='50' style={{ border: 'none', borderRadius: '50px' }} alt='' />
                                    <h5 >@{post.post_op.username}
                                        <p style={{ fontSize: '10px', color: 'grey', margin: '0' }}>{post.dop}</p>
                                    </h5>
                                    <p style={{ marginLeft: 'auto' }}></p>
                                    <Modify1 flag={['p', { post }]} />
                                </div>

                                <p className='m-0'>{post.post_body}</p>
                                <a href={`${post.image_path}`} target="_blank" rel="noreferrer">
                                    <img src={`${post.image_path}`} width='250' alt='' />
                                </a>
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
                        <img className="bgprop" src={abckid} alt="kid" />
                    </div>
                    <div className='row p-3 m-1 marker' style={{ backgroundColor: '#d9d9d9cc', width: '27%', position: 'fixed', marginRight: '50px' }}>
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

                        <h6 className='mt-2' onClick={() => setRoutinePop(true)}>Class Schedule</h6>
                        <div style={{ display: 'flex', justifyContent: 'space-evenly', fontFamily: 'inter' }}>
                            <select className="form-control custom-select" style={{ backgroundColor: 'transparent', border: 'none' }} onChange={(e) => setParam({ ...param, building: e.target.value })}>
                                <option>Building</option>
                                <option value="AB2">AB2</option>
                                <option value="AB3">AB3</option>
                            </select>
                            <select className="form-control custom-select" style={{ backgroundColor: 'transparent', border: 'none' }} onChange={(e) => setParam({ ...param, room: e.target.value })}>
                                <option>Room</option>
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
                            <select className="form-control custom-select" style={{ backgroundColor: 'transparent', border: 'none' }} onChange={(e) => setParam({ ...param, day: e.target.value })}>
                                <option>Weekday</option>
                                <option value="Mon">Mon</option>
                                <option value="Tue">Tue</option>
                                <option value="Wed">Wed</option>
                                <option value="Thu">Thu</option>
                                <option value="Fri">Fri</option>
                            </select>
                            <button type='submit' onClick={search}>Search</button>
                        </div>
                    </div>


                </div>

            </div>
            {popUp && <Edit setPopUp={setPopUp} setPropToEdit={propToEdit} />}

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
                        <h4  className='text-center'>Class routine</h4>
                        <img src={'http://localhost:5000/uploads/routine'+group_id+'.jpg'} width='800px' alt='' />
                    </div>
                </div>
            </div>}

            {searchPop && <div>
                <div className='modal-backdrop' onClick={() => setSearchPop(false)}></div>
                <div className="card PopEvent" key={`${cardDetails.event_id}`} style={{ zIndex: '1050' }}>
                    <div className="card-body p-2 inter" style={{ backgroundColor: color, width: '100%' }}>
                        <h4  className='text-center'>{param.building} {param.room} on {param.day}day</h4>
                        {/* <small>{cardDetails.date}</small>  &ensp; <small>{cardDetails.place}</small>  */}
                        <p></p>
                        {slot.map((s) => (
                            <div>
                               {s.slot && <p>{s.slot} {'->'}  {s.course} {s.group && <label>{s.group.prog}{s.group.section}</label>} {s.info}</p>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>}
        </div >
    )
}

export default Group
