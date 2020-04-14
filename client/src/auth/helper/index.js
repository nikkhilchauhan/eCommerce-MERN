// Register a user & returns response
export const signup = (user) => {
  return fetch('/api/signup', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// Signin a user & return response
export const signin = (user) => {
  return fetch('/api/signin', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// Sets token to local Storage
export const authenticate = (data, next) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth-token', JSON.stringify(data));
    next(); //we can fireup a callback function
  }
};

// Clears up the token from local storage
export const signout = (next) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth-token');
    next();

    return fetch('/api/signout', {
      method: 'GET',
    })
      .then((response) => console.log('Signout success'))
      .catch((err) => console.log(err));
  }
};

//  Check for Authentication - checks if there is Token&User in local storage & returns
export const isAutheticated = () => {
  if (typeof window == 'undefined') {
    return false;
  }
  if (localStorage.getItem('auth-token')) {
    return JSON.parse(localStorage.getItem('auth-token'));
  } else {
    return false;
  }
};
