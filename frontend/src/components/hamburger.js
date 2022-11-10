import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import '../static/header.css';

const Hamburger = () => {
    const history = useHistory();


    const profileButton = async () => {
        history.push("./profile");
    }
    const homeButton = async () => {
        history.push("./home");
    }
    const groupButton = async () => {
        history.push("./group");
    }
    const clubButton = async () => {
        history.push('./club');
    }
    const shopButton = async () => {
        history.push("./shop");
    }
    const supportButton = async () => {
        history.push("./support");
    }

    return (
        <Menu  >
            <div className="offcanvas-body comfortaa" >
                <ul className="navbar-nav p-3 gap-2">
                    <li >
                        <button type="button" className="menu-item btn btn-light btn-block text-center" onClick={profileButton}>
                            <a>Profile</a>
                        </button>
                    </li>

                    <li>
                        <button type="button" className="btn btn-light btn-block text-center" onClick={homeButton}>
                            <a>Home</a>
                        </button>
                    </li>

                    <li>
                        <button type="button" className="btn btn-light btn-block text-center" onClick={groupButton}>
                            <a >Group</a>
                        </button>
                    </li>
                    <li>
                        <button type="button" className="btn btn-light btn-block text-center" onClick={clubButton}>
                            <a >Clubs</a>
                        </button>
                    </li>

                    <li >
                        <button type="button" className="btn btn-light btn-block text-center" onClick={shopButton}>
                            <a>Shop</a>
                        </button>
                    </li>

                    <li>
                        <button type="button" className="btn btn-light btn-block text-center" onClick={supportButton}>
                            <a >Support</a>
                        </button>
                    </li>

                    < div className="penguin" >
                        <div className="penguin-head">
                            <div className="face left"></div>
                            <div className="face right"></div>
                            <div className="chin"></div>
                            <div className="eye left">
                                <div className="eye-lid"></div>
                            </div>
                            <div className="eye right">
                                <div className="eye-lid"></div>
                            </div>
                            <div className="blush left"></div>
                            <div className="blush right"></div>
                            <div className="beak top"></div>
                            <div className="beak bottom"></div>
                        </div>
                        <div className="shirt">
                        </div>
                        <div className="penguin-body">
                            <div className="arm left"></div>
                            <div className="arm right"></div>
                            <div className="foot left"></div>
                            <div className="foot right"></div>
                        </div>
                    </div >
                </ul>
            </div>
        </Menu>
    )
}

export default Hamburger