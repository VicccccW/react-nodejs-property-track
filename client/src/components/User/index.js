import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"; //connect this component to the store that's provided by the provider component
import { loginRequest, loginRequestSuccess } from "../../redux/auth/authActions"
import "./index.css"

const User = () => {
  const dispatch = useDispatch();

  let isLogInLoading = useSelector(state => state.auth.loading);

  let isLoggedIn = useSelector(state => state.auth.loggedIn);

  const user = useSelector(state => state.auth.user);

  const params = new URLSearchParams(window.location.search);

  async function fetchUser() {
    const userInfo = await fetch('/api/auth/whoami')
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(res);
        }
      })
      .catch(err => console.log(err));
    return userInfo;
  }

  useEffect(() => {
    if (params.get('valid') && !isLoggedIn) {
      dispatch(loginRequest());

      fetchUser()
        .then(user => {
          if (user) {
            dispatch(loginRequestSuccess(user));
          }
        })
        .catch(err => console.log(err));
    }
  }, [isLogInLoading]);

  return (
    <div>
      {isLoggedIn
        ? <p>Hola, {user.display_name} ({user.username}) !</p>
        : ''
      }
    </div>
  );
};

export default User;