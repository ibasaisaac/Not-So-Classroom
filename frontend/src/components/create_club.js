import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import '../static/verification_pop.css';
import giraffe from '../static/giraffe.svg';
import birdies from '../static/birdies.svg';



const ClubCreate = props => {
    const setPopUp = props.setClubCreatePopUp
    const [user] = useState(props.setUser)
    const [code, setCode] = useState('');
    const [msg, setMsg] = useState('');
    const [club, setClub] = useState({ name: '', about: '' });

    const Auth = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/createclub', {
            mod_id: user.student_id,
            name: club.name,
            about: club.about
        })
            .then(res => {
                if (res.status === 200) {
                    setCode(res.data);
                    console.log(res.data);
                    setMsg('Copy and share it with others!');
                    toast.success("Registration Successful!")
                    // {
                    //     onClose: () => {
                    //         setPopUp(false)
                    //     }
                    // })
                }
            })
            .catch(error => {
                if (error.response.status === 402) { setMsg(error.response.data.msg); }
            });
    }

   
    return (
        <div className="container-fluid PopCreate">
            <button className="popup-x" onClick={() => setPopUp(false)} >X</button>

            <img alt='' className="giraffe" src={giraffe} />
            <img alt='' className="birdie" src={birdies} />

            <form className="form-containn_create mb-3" style={{ fontFamily: 'comfortaa' }} onSubmit={Auth} >

                <h3 className="text-center mb-4" style={{ fontFamily: 'marker', color: 'black', fontSize: '20px' }}>Club information</h3>

                <div className="form-group row mb-2">
                    <label htmlFor="name" className="col-sm-4 col-form-label">Club name</label>
                    <div className="col-sm-8">
                        <input type="text" required className="form-control" id="name" value={club.name} onChange={(e) => setClub({ ...club, name: e.target.value })} />
                    </div>
                </div>

                <div className="form-group row mb-2" >
                    <label htmlFor="count" className="col-sm-4 col-form-label">About</label>
                    <div className="col-sm-8">
                        <input type="text" id="about" required className="form-control" onChange={(e) => setClub({ ...club, about: e.target.value })} />
                    </div>
                </div>

                <div className="form-group row mb-3" >
                    <label htmlFor="otp" className="col-sm-4 col-form-label">Club code</label>
                    <div className="col-sm-8">
                        <input type="text" id="otp" readOnly className="form-control-plaintext" value={code} onClick={(e) => { navigator.clipboard.writeText(e.target.value); setMsg('Copied!') }} />
                        <small>{msg}</small>
                    </div>
                </div>

                <div className="form-group row text-center">
                    <div className="col-sm-12">
                        <button type="submit" className="btn btn-light btn-lg bt_modal" >Enter</button>
                    </div>
                </div>

            </form>
        </div>
    )


}
export default ClubCreate;