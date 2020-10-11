import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {useSelector} from "react-redux";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {

  const user = useSelector(state=>state);
  return (
    <div className="app">
      {user.username?(
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/login">
              Login
            </Route>
            <Route>
              Page not found
            </Route>
          </Switch>
        </Router>
      ):(
        <Login />
      )}
      
    </div>
  );
}

export default App;
