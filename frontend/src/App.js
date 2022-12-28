import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/header";
import Home from "./components/home";
import Profile from "./components/profile";
import Group from "./components/group";
import Shop from './components/shop';
import Clubmenu from "./components/club_menu";
import Club from "./components/club";
import Verification from "./components/verification";
import Login from "./components/login";
import Register from "./components/register";
import Chat from "./components/chat";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route exact path="/" element={(<><Header /> <Home /></>)} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={(<><Header /> <Verification /></>)} />
        <Route path="/home" element={(<><Header /> <Home /></>)} />
        <Route path="/profile" element={(<><Header /> <Profile /></>)} />
        <Route path="/group" element={(<><Header /> <Group /></>)} />
        <Route path="/clubmenu" element={(<><Header /> <Clubmenu /></>)} />
        <Route path="/club" element={(<><Header /> <Club /></>)} />
        <Route path="/shop" element={(<><Header /> <Shop /></>)} />
        <Route path="/chat" element={(<><Header /> <Chat /></>)} />

      </Routes >
    </BrowserRouter >
  );
}

export default App;



