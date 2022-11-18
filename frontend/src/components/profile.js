import React, { useState } from 'react';
import '../static/profile.css';

const Profile = () => {
    return (
        <div>
            <header>
                <div className="wrapper">
                    <input type="file" className="my_file" />
                        <p className="c">Picture</p>
                        <p className="p">Change</p>
                </div>

                <p className="name">Isaba Ishrak</p>
                <p className="ib">@ibasa</p>
            </header>

            <div id="section1">
                <div className="container">
                    <p className="role">Role:</p>
                    <button className="btnn btn1">Student</button>
                    <a href="#section2" className="btnn btn2">CR</a>
                    <a href="#section3" className="btnn btn3">Club Moderator</a>
                    <a href="#" style={{color: 'black', position: 'relative', left: '20px'}}>Ask role access</a>
                </div>

                <div className="emm">
                    <p className="email" style={{margin: '20px', display: 'inline'}}>Email: </p>
                    <p className="em" style={{margin: '20px', display: 'inline'}}>ibasaisaac@iut-dhaka.edu</p>
                </div>

                <div className="pp">
                    <p className="password" style={{margin: '20px', display: 'inline'}}>Password:</p>
                    <p className="p" style={{margin: '20px', display: 'inline'}}>*****</p>
                </div>

                <div className="c_s">
                    <a className="change" href="#" style={{color:'black'}}>Change</a>
                    <a href="#" style={{color:'grey'}}>Save</a>
                </div>

                <div className="all">
                    <p className="allow">Allow desktop notification:</p>
                    <input type="checkbox" className="chk" id="switch" />
                    <label className="labell" htmlFor="switch"></label>
                    <div className="s"></div>
                    <div className="background"></div>
                </div>
            </div>

            <div id="section2">
                <h5 style={{position: 'relative', left: '22%', top: '82.5px'}}>My Groups</h5>
                <div className="sec2">
                    <p style={{position: 'relative', left: '5%', top: '35px'}}>Add Event:</p>

                    <div className="room">
                        <p className="r">302</p>
                    </div>

                    <div className="date">
                        <p className="d">8.00 pm -- 13.09.22</p>
                    </div>

                    <div className="details">
                        <p className="dd">CSE 4511 - Chapter 5</p>
                    </div>

                    <div className="clc">
                        <button className="click">Place</button>
                        <div className="list">
                            <button className="links">AB1</button>
                            <button className="links">AB2</button>
                            <button className="links">AB3</button></div>
                    </div>
                </div>

                <div className="enter">
                    <button className="e">Enter</button>
                </div>

            </div>

            <div id="section3">
                <h5 style={{position: 'relative', left: '22%', top: '82.5px'}}>My Clubs</h5>
                <div className="sec3">
                    <p style={{position: 'relative', left: '5%', top: '15px'}}>Add Event:</p>

                    <div className="croom">
                        <p className="cr">302</p>
                    </div>

                    <div className="cdate">
                        <p className="cd">8.00 pm -- 13.09.22</p>
                    </div>

                    <div className="cdetails">
                        <p className="cdd">App Development</p>
                    </div>

                    <div className="clc1">
                        <button className="click1">Place</button>
                        <div className="list1">
                            {/* <button className="links1">AB1</button>
                            <button className="links1">AB2</button>
                            <button className="links1">AB3</button>  */}
                        </div>
                    </div>
                </div>

                <div className="enter1">
                    <button className="e1">Enter</button>
                </div>
            </div>
        </div >
    )
}

export default Profile