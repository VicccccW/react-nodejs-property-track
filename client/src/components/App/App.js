import React, { useEffect, useState } from 'react';
import './App.css';
import NavBar from '../NavBar';
import About from '../About';
import PropertyMap from '../PropertyMap';
import PostgresDB from '../PostgresDB/';
import SFEventToast from '../SFEventToast';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useGlobalState } from '../../hooks/globalHook';
import { fetchUserInfo, saveToLocalStorage } from '../../helper';
import socketIOClient from 'socket.io-client';

// store this var outside the component
let socket;

const App = () => {
  const { auth, authInSuccess, authExpire, sfEvent, sfEventAddNew, sfEventRemoveOld } = useGlobalState();
  const [socketConn, setSocketConn] = useState(false);

  const ENDPOINT = process.env.NODE_ENV === 'development'
    ? 'http://localhost:9000'
    : `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;

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

  useEffect(() => {
    //if user is logged in but no connection, init one socket
    if (auth.isLoggedIn && !socketConn) {
      //only init a socket when use loggedin and no socket connection
      socket = socketIOClient(ENDPOINT);

      // data format:
      // {
      //   "schema": "hLKai_KX6XEaCHPwI-NDxQ",
      //   "payload": {
      //     "CreatedById": "0050w000001ebrUAAQ",
      //     "Number_of_Records__c": 1,
      //     "CreatedDate": "2020-05-07T14:58:25.652Z",
      //     "Event_Type__c": "UPDATE"
      //   },
      //   "event": {
      //     "replayId": 5127531
      //   }
      // }
      socket.on('SFEVENT', (data) => {
        sfEventAddNew(JSON.parse(data));
      });

      setSocketConn(true);
    }

    if (!auth.isLoggedIn && socketConn) {
      setSocketConn(false);
      socket.disconnect(true);
    }

  }, [auth, socketConn]);

  // the Toast durating doesn't work properly, so use setTimeout
  useEffect(() => {
    if (sfEvent) {
      setTimeout(() => {
        sfEventRemoveOld();
      }, 5000);
    }
  }, [sfEvent]);

  return (
    <div className="app-container">
      {sfEvent && sfEvent.payload ? <SFEventToast event={sfEvent} /> : null}
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
};

export default App;
