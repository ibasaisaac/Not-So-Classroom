import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/home";
import Profile from "./components/profile";
import Clubmenu from "./components/club_menu";
import Verification from "./components/verification";
import Login from "./components/login";
import Header from "./components/header";
import Register from "./components/register";
// app.locals.User = ;

function App() {
  return (
    <BrowserRouter>
      <Switch>

        <Route exact path="/">
          <Header/>
          <Home /> 
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/verify">
          <Verification />
        </Route>

        <Route path="/home">
          <Header />
          <Home />
        </Route>

        <Route path="/profile">
          <Header />
          <Profile />
        </Route>

        <Route path="/club">
          <Header />
          <Clubmenu />
        </Route> 

      </Switch >
    </BrowserRouter >
  );
}

export default App;