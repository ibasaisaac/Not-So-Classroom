import React, { useState } from 'react';
import { toast } from 'react-toastify';
import '../static/verification_pop.css';
import giraffe from '../static/giraffe.svg';
import birdies from '../static/birdies.svg';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const CR_verification = props => {
    const { setPopUp } = props;
    const [student_id,setID]=useState('');
    // const [otp, setOTP] = useState('');
     const [msg1, setMsg1] = useState('');
     const [msg2, setMsg2] = useState('');
    const history = useHistory();


    const cr_verify = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/cr_verify', {
            student_id: student_id
        })
            .then(res => {
                if (res.status === 200) {
                    setMsg1(res.data.msg);
                    toast.success("CR verified!");
                    setPopUp(false);
                    history.push('./profile');
                }
            })
            .catch(error => {
                if (error.response.status === 402) { setMsg1(error.response.data.msg1); }
            });
    }

    return (
        <div className="container-fluid PopUp">
            <button className="popup-x" onClick={() => setPopUp(false)} >X</button>

            <img alt=''  className="giraffe" src={giraffe} />
            <img alt=''  className="birdie" src={birdies} />

            <form className="form-container_modal" style={{ fontFamily: 'comfortaa' }} onSubmit={cr_verify} >

                <h3 className="text-center mb-5" style={{ fontFamily: 'marker', color: 'black', fontSize: '25px' }}>AUTHENTICATE</h3>

                <div className="form-group">
                    <label htmlFor="id">Enter your ID</label>
                    <input type="text" id="student_id" name="student_id" required className="form-control" style={{ borderRadius: 0 }} 
                    value={student_id} onChange={(e) => {setID(e.target.value); setMsg1('')}}/>
                    <span className='left' style={{ height: '13px' }}><p style={{ fontFamily: 'actor', 
                    color: 'var(--vista)', fontSize: '13px' }}>{msg1}</p></span>
                </div>
                <div className="text-center mt-5">
                    <button type="submit" className="btn btn-light btn-lg bt_modal" >Enter</button>
                </div>
            </form>
        </div>
        
    )
}
export default CR_verification;