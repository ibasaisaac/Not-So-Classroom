import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import '../static/verification_pop.css';
import giraffe from '../static/giraffe.svg';
import birdies from '../static/birdies.svg';



const GroupCreate = props => {
    const setPopUp = props.setGroupCreatePopUp
    const [user] = useState(props.setUser)
    const [code, setCode] = useState('');
    const [msg, setMsg] = useState('');
    const [group, setGroup] = useState({ name: '', dept: '', prog: '', batch: '', section: '', count: '' });
    const [progs, setProgs] = useState([]);
    const navigate = useNavigate();

    const Auth = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/creategroup', {
            cr_id: user.student_id,
            name: group.name,
            dept: group.dept,
            prog: group.prog,
            batch: group.batch,
            section: group.section,
            count: group.count
        })
            .then(res => {
                if (res.status === 200) {
                    setCode(res.data);
                    setMsg('Copy and share it with others!');
                    toast.success("Registration Successful!", {
                        onClose: () => {
                            setPopUp(false);
                            navigate('/group')
                        }
                    })
                }
            })
            .catch(error => {
                if (error.response.status === 402) { setMsg(error.response.data.msg); }
            });
    }

    const handleProg = (e) => {
        setGroup({ ...group, dept: e })
        switch (e) {
            case 'MPE': setProgs(['MPE', 'IPE']); break;
            case 'EEE': setProgs(['EEE']); break
            case 'TVE': setProgs(['TVE']); break
            case 'CSE': setProgs(['CSE', 'SWE']); break
            case 'CEE': setProgs(['CEE']); break
            case 'BTM': setProgs(['BTM']); break
            default: setProgs([])
        }
    }

    return (
        <div className="container-fluid PopCreate">
            <button className="popup-x" onClick={() => setPopUp(false)} >X</button>

            <img alt='' className="giraffe" src={giraffe} />
            <img alt='' className="birdie" src={birdies} />

            <form className="form-containn_create mb-3" style={{ fontFamily: 'comfortaa' }} onSubmit={Auth} >

                <h3 className="text-center mb-4" style={{ fontFamily: 'marker', color: 'black', fontSize: '20px' }}>Create a Group for your class</h3>

                <div className="form-group row mb-2">
                    <label htmlFor="name" className="col-sm-4 col-form-label">Group name</label>
                    <div className="col-sm-8">
                        <input type="text" required className="form-control" id="name" value={group.name} onChange={(e) => setGroup({ ...group, name: e.target.value })} />
                    </div>
                </div>

                <div className="form-group row mb-2" >
                    <label htmlFor="dept" className="col-sm-4 col-form-label">Department</label>
                    <div className="col-sm-8">
                        <select defaultValue={0} className="form-control custom-select" id="dept" onChange={(e) => handleProg(e.target.value)}>
                            <option value={0} disabled>Choose...</option>
                            <option value={'MPE'}>MPE</option>
                            <option value={'EEE'}>EEE</option>
                            <option value={'TVE'}>TVE</option>
                            <option value={'CSE'}>CSE</option>
                            <option value={'CEE'}>CEE</option>
                            <option value={'BTM'}>BTM</option>
                        </select>
                    </div>
                </div>

                <div className="form-group row mb-2" >
                    <label htmlFor="prog" className="col-sm-4 col-form-label">Programme</label>
                    <div className="col-sm-8">
                        <select defaultValue={0} className="form-control custom-select" id="prog" onChange={(e) => setGroup({ ...group, prog: e.target.value })}>
                            <option value={0} disabled>Choose...</option>
                            {progs.map((p) => (
                                <option key={p} value={p}>{p}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="form-group row mb-2" >
                    <label htmlFor="batch" className="col-sm-4 col-form-label">Batch</label>
                    <div className="col-sm-8">
                        <select defaultValue={0} className="form-control custom-select" id="batch" onChange={(e) => setGroup({ ...group, batch: e.target.value })}>
                            <option value={0} disabled>Choose...</option>
                            <option value={2018}>2018</option>
                            <option value={2019}>2019</option>
                            <option value={2020}>2020</option>
                            <option value={2021}>2021</option>
                        </select>
                    </div>
                </div>

                <div className="form-group row mb-2" >
                    <label htmlFor="section" className="col-sm-4 col-form-label">Section</label>
                    <div className="col-sm-8">
                        <select defaultValue={0} className="form-control custom-select" id="section" onChange={(e) => setGroup({ ...group, section: e.target.value })}>
                            <option value={0} disabled>Choose...</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                        </select>
                    </div>
                </div>

                <div className="form-group row mb-2" >
                    <label htmlFor="count" className="col-sm-4 col-form-label">Students</label>
                    <div className="col-sm-8">
                        <input type="number" id="count" required className="form-control" onChange={(e) => setGroup({ ...group, count: e.target.value })} />
                    </div>
                </div>

                <div className="form-group row mb-3" >
                    <label htmlFor="otp" className="col-sm-4 col-form-label">Group code</label>
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
export default GroupCreate;