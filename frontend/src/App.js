import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/home";
import Verification from "./components/verification";
import Login from "./components/login";
import Navbar from "./components/hamburger";
import Register from "./components/register";
 
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Login/>
        </Route>
        <Route path="/register">
          <Register/>
        </Route>
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/verify">
          <Verification/>
        </Route>
        <Route path="/home">
          <Navbar/>
          <Home/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
 
export default App;