import React, { useState } from 'react';
import '../static/clubmenu.css';
import us from '../static/us.png';
import axios from 'axios';

const Clubmenu = () => {
    return (
        <div className="container-fluid cont">
        <img className="us" src={us} />

        <div className="container-fluid" style={{fontFamily: 'marker'}}>
            <button className="button btn1">IUT COMPUTER SOCIETY (IUTCS)</button>
            <button className="button btn2">IUT MARS ROVER</button>
            <button className="button btn3">IUT AL-FARAZI INTERSTELLAR SOCIETY (IUTFIS)</button>
            <button className="button btn4">IUT CAREER + BUSINESS SOCIETY (IUTCBS)</button>
            <button className="button btn5">IUT PHOTOGRAPHIC SOCIETY (IUTPS)</button>
            <button className="button btn6">IUT DEBATING SOCIETY (IUTDS)</button>
            <button className="button btn7">+</button>
        </div>
    </div>
    )
}

export default Clubmenu