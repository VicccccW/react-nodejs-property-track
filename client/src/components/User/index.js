import React from "react";
import { useSelector } from "react-redux"; //connect this component to the store that's provided by the provider component
import "./index.css";

const User = () => {
  let isLoggedIn = useSelector((state) => state.auth.loggedIn);

  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <p>{user.display_name}</p>
          <p className="user-profile-block">({user.username})</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default User;
