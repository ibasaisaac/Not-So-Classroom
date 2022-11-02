import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import '../static/hamburger.css';

const Navbar = () => {
    const [navbarOpen, setNavbarOpen] = useState(false);
    const history = useHistory();


    const handleToggle = () => {
        setNavbarOpen(prev => !prev)
    }
    const closeMenu = () => {
        setNavbarOpen(false)
    }
    return (
        <div className="p-3 m-0 border-0 bd-example">
            <nav className="navbar">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="offcanvas offcanvas-start offcanvas-size-xxl" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <div className="d-grid gap-2" style={{ fontFamily: 'comfortaa' }}>
                                    <li className="nav-item">
                                        <button type="button" className="btn btn-light btn-success btn-block text-center mb-3">
                                            {/* <a className="nav-link active" aria-current="page" href="#">Profile</a>  */}
                                            <a className="nav-link" href="#">Profile</a>
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <button type="button" className="btn btn-light btn-success btn-block text-center mb-3">
                                            <a className="nav-link" href="#">Home</a>
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <button type="button" className="btn btn-light btn-success btn-block text-center mb-3">
                                            <a className="nav-link" href="#">Group</a>
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <button type="button" className="btn btn-light btn-success btn-block text-center mb-3">
                                            <a className="nav-link" href="#">Clubs</a>
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <button type="button" className="btn btn-light btn-success btn-block text-center mb-3">
                                            <a className="nav-link" href="#">Shop</a>
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <button type="button" className="btn btn-light btn-success btn-block text-center mb-3">
                                            <a className="nav-link" href="#">Support</a>
                                        </button>
                                    </li>
                                    <div className="penguin" >
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
                                    </div>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
        // <nav className="navbar navbar-light lighten-4 mb-4">
        //     <a className="navbar-brand" href="#"></a>
        //     <button className="navbar-toggler first-button" type="button" data-toggle="collapse" data-target="#navbarSupportedContent20"
        //         aria-controls="navbarSupportedContent20" aria-expanded="false" aria-label="Toggle navigation" onClick={handleToggle}>
        //         <div className="animated-icon1" ><span></span><span></span><span></span></div>

        //     </button>
        //     <div className="collapse navbar-collapse" id="navbarSupportedContent20">
        //         <ul className="navbar-nav mr-auto">
        //             <li className="nav-item active">
        //                 <a className="nav-link" href="#">Profile <span className="sr-only"></span></a>
        //             </li>
        //             <li className="nav-item">
        //                 <a className="nav-link" href="#">Home</a>
        //             </li>
        //             <li className="nav-item">
        //                 <a className="nav-link" href="#">Group</a>
        //             </li>
        //             <li className="nav-item">
        //                 <a className="nav-link" href="#">Clubs</a>
        //             </li>
        //             <li className="nav-item">
        //                 <a className="nav-link" href="#">Shop</a>
        //             </li>
        //             <li className="nav-item">
        //                 <a className="nav-link" href="#">Support</a>
        //             </li>
        //             <li className="nav-item"> 
        //             <div className="penguin" >
        //                 <div className="penguin-head">
        //                     <div className="face left"></div>
        //                     <div className="face right"></div>
        //                     <div className="chin"></div>
        //                     <div className="eye left">
        //                         <div className="eye-lid"></div>
        //                     </div>
        //                     <div className="eye right">
        //                         <div className="eye-lid"></div>
        //                     </div>
        //                     <div className="blush left"></div>
        //                     <div className="blush right"></div>
        //                     <div className="beak top"></div>
        //                     <div className="beak bottom"></div>
        //                 </div>
        //                 <div className="shirt">
        //                 </div>
        //                 <div className="penguin-body">
        //                     <div className="arm left"></div>
        //                     <div className="arm right"></div>
        //                     <div className="foot left"></div>
        //                     <div className="foot right"></div>
        //                 </div>
        //             </div></li>
        //         </ul>
        //     </div>
        // </nav>
    )
}

export default Navbar