import React, { useEffect } from "react";
import "./App.css";
import NavBar from "../NavBar";
import About from "../About";
import PropertyMap from "../PropertyMap";
import PostgresDB from "../PostgresDB";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginRequest, loginRequestSuccess, loginNoAuthData } from "../../redux/auth/authActions"

function App() {

  const dispatch = useDispatch();

  let isLoggedIn = useSelector(state => state.auth.loggedIn);

  async function fetchUser() {
    const userRes = await fetch('/api/auth/whoami');

    if (userRes.status === 200 || userRes.status === 304) {
      const user = await userRes.json();
      return user;
    } else if (userRes.status === 401) {
      return Promise.reject('Unauthorized');
    } else {
      return;
    }
  }

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(loginRequest());

      fetchUser()
        .then(user => {
          if (user) {
            dispatch(loginRequestSuccess(user));
          } else {
            dispatch(loginNoAuthData());
          }
        })
        .catch(err => {
          dispatch(loginNoAuthData());
        });
    }
  }, [isLoggedIn]);

  return (
    <div className="app-container">
      <Router>
        <NavBar />
        <Switch>
          <Route path="/" exact component={About} />
          <Route path="/propertyMap" component={PropertyMap} />
          <Route path="/postgresDB" component={PostgresDB} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
