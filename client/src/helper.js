export const fetchUserInfo = async () => {
  const res = await fetch('/api/auth/whoami');

  if (res.status === 200 || res.status === 304) {
    const user = await res.json();
    return user.NoAuth ? null : user;
  } else if (res.status === 401) {
    return Promise.reject('Unauthorized');
  } else {
    return;
  }
};

export const fetchLogout = async () => {
  const res = await fetch('/api/auth/logout');

  if (res.ok) {
    const resInfo = await res.json();
    return resInfo;
  } else {
    return;
  }
};

export const saveToLocalStorage = (id, state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(id, serializedState);
  } catch (e) {
    console.log(e);
  }
};

export const removeFromLocalStorage = (id) => {
  try {
    localStorage.removeItem(id);
  } catch (e) {
    console.log(e);
  }
};

export const getFromLocalStorage = (id) => {
  try {
    return JSON.parse(localStorage.getItem(id));
  } catch (e) {
    console.log(e);
  }
};
