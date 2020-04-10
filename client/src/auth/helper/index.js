import axios from 'axios';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const signup = async ({ first_name, last_name, email, password }) => {
  const body = JSON.stringify({ first_name, last_name, email, password });
  try {
    const res = await axios.post('/api/signup', body, config);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const signin = ({ email, password }) => {
  const body = JSON.stringify({ email, password });
  return axios
    .post('/api/signin', body, config)
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const authenticate = (data, next) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('x-auth-token', JSON.stringify(data));
    next();
  }
};

export const isAutheticated = () => {
  if (typeof window == 'undefined') {
    return false;
  }
  if (localStorage.getItem('x-auth-token')) {
    return JSON.parse(localStorage.getItem('x-auth-token'));
  } else {
    return false;
  }
};

export const signout = (next) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('x-auth-token');
    next();

    return fetch('api/signout', {
      method: 'GET',
    })
      .then((response) => console.log(`signout success:${response}`))
      .catch((err) => console.log(err));
  }
};
