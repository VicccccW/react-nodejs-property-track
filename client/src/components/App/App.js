import React, { useEffect } from 'react';
import './App.css';
import NavBar from '../NavBar';
import About from '../About';
import PropertyMap from '../PropertyMap';
import PostgresDB from '../PostgresDB/';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useGlobalState } from '../../hooks/globalHook';
import { fetchUserInfo, saveToLocalStorage } from '../../helper';

function App() {
  const { auth, authInSuccess, authExpire } = useGlobalState();

  /**
   * invoke only when app first render
   * in auth callback scenario, localstorage lost
   * so call the fetch
   */
  useEffect(() => {
    if (!auth.user) {
      fetchUserInfo()
        .then((res) => {
          if (res) {
            authInSuccess(res);
          } else {
            authExpire();
          }
        })
        .catch((err) => {
          authExpire();
          console.log(err);
        });
    }
  }, []);

  /**
   * invoke every time the auth state changes
   * e.g. login or logout
   */
  useEffect(() => {
    saveToLocalStorage('auth', auth);
  }, [auth]);

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
