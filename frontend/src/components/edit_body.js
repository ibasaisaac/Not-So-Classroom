import React, { useState } from 'react';
import { toast } from 'react-toastify';
import '../static/home.css';
import axios from 'axios';


const Edit = props => {
    console.log(props)
    const setPopUp  = props.setPostEditPopUp
    const [propToEdit] = useState(props.setPropToEdit[0])
    const [text, setText] = useState(props.setPropToEdit[1])

    const Edit_post = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/edit_post', {
            post_id: text.post_id,
            post_body: text.post_body
        })
            .then(res => {
                if (res.status === 200) {
                    toast.success(res.data.msg, {
                        // onClose: () => window.location.reload(true)
                    });
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    const Edit_comment = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/edit_comment', {
            comment_id: text.comment_id,
            comment_body: text.comment_body
        })
            .then(res => {
                if (res.status === 200) {
                    toast.success(res.data.msg, {
                        // onClose: () => window.location.reload(true)
                    });
                }
            })
            .catch(error => {
                console.log(error);
            });
    }


    if (propToEdit === 'p') {
        return (
            <div className="container-fluid PopEdit">
                <button className="popup-x" onClick={() => setPopUp(false)}  >X</button>

                <div className='form-contain'>
                    <form onSubmit={Edit_post} style={{ display: 'flex', alignItems: 'center', fontFamily: 'comfortaa' }} >
                        <i className="fa fa-regular fa-pen-to-square fa-2x"></i>
                        <textarea rows="1" className="form-control ms-4 me-2 box" value={text.post_body} onChange={(e) => setText({ ...text, post_body: e.target.value })}></textarea>
                        <button type="submit" className="btn btn-light btn-sn btn_modal" >Enter</button>
                    </form>
                </div>
            </div>
        )
    }

    else {
        return (
            <div className="container-fluid PopEdit">
                 <button className="popup-x" onClick={() => setPopUp(false)} >X</button>

                <div className='form-contain'>
                    <form onSubmit={Edit_comment} style={{ display: 'flex', alignItems: 'center', fontFamily: 'comfortaa' }}  >
                        <i className="fa fa-regular fa-comment fa-lg ms-1"></i>
                        <textarea rows="1" className="form-control ms-4 me-2 box" value={text.comment_body} onChange={(e) => setText({ ...text, comment_body: e.target.value })}></textarea>
                        <button type="submit" style={{ border: 'none', backgroundColor: 'transparent' }} ><i className="fa fa-regular fa-paper-plane fa-lg me-1"></i></button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Edit;