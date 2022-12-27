import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import '../static/verification_pop.css';
import giraffe from '../static/giraffe.svg';
import birdies from '../static/birdies.svg';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';

const CR_verification = props => {
    const { setPopUp } = props;
    //const [rolePopup, setPopUp] = useState(false);
    const [id,setID]=useState('')
    const [role,setRole]= useState('')
    const [user] = useState(props.setUser)
    const [msg, setMsg] = useState('')
    const navigate = useNavigate()

    const cr_verify = async (e) => {
        e.preventDefault();
            axios.post('http://localhost:5000/cr_verify', {
                cur_id: user.student_id,
                id:id
        })
            .then(res => {
                if (res.status === 200) {
                    if (res.status === 200) {
                        setMsg(res.data.msg);
                        toast.success(res.data.msg);
                        console.log(89);
                        setPopUp(false);
                        navigate('/profile');
                    }
                }
            })
        //})
            .catch(error => {
                if (error.response.status === 402) { 
                    setMsg(error.response.data.msg); }
            });
    }

    return (
        <div className="container-fluid PopUp">
            <button className="popup-x" onClick={() => setPopUp(false)} >X</button>

            <img alt=''  className="giraffe" src={giraffe} />
            <img alt=''  className="birdie" src={birdies} />

            <form className="form-container_modal" style={{ fontFamily: 'comfortaa' }} 
            onSubmit={cr_verify} >

                <h3 className="text-center mb-5" style={{ fontFamily: 'marker', color: 'black', fontSize: '25px' }}>AUTHENTICATE</h3>

                <div className="form-group">
                    <label htmlFor="id">Enter your ID</label>
                    <input type="text" id="id" name="id" required className="form-control" style={{ borderRadius: 0 }} 
                    value={id} onChange={(e) => {setID(e.target.value); setMsg('')}}/>
                    <span className='left' style={{ height: '13px' }}><p style={{ fontFamily: 'actor', 
                    color: 'var(--vista)', fontSize: '13px' }}>{msg}</p></span>
                </div>
                <div className="text-center mt-5">
                    <button type="submit" className="btn btn-light btn-lg bt_modal">Enter</button>
                </div>
            </form>
        </div>
        
    )
}
export default CR_verification;