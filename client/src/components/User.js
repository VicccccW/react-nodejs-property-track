import React from 'react';
import { useGlobalState } from '../hooks/globalHook';

const User = () => {
  const { auth } = useGlobalState();

  return (
    <div>
      <div>
        <p>{auth.user.display_name}</p>
        <p className="user-profile-block">({auth.user.username})</p>
      </div>
    </div>
  );
};

export default User;
