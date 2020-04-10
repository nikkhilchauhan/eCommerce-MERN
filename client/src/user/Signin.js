import React, { useState } from 'react';
import Base from '../core/Base';
import { Link, Redirect } from 'react-router-dom';
import { signin, authenticate, isAutheticated } from '../auth/helper/';

const Signin = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    didRedirect: false,
    isSuccess: false,
    isLoading: true,
  });

  const { email, password, error, didRedirect, isSuccess, isLoading } = values;
  const { user } = isAutheticated();

  const changeHandler = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: '', isSuccess: false, isLoading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, isLoading: false });
        } else {
          // Because there a next in authenticate function we can fire up a callback
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        }
      })
      .catch(console.log('Signin request failed'));
  };

  const signinForm = () => {
    return (
      <div className='row'>
        <div className='col-md-6 offset-sm-3 text-left'>
          <form action=''>
            <div className='form-group'>
              <label className='text-light'>Email</label>
              <input
                onChange={changeHandler('email')}
                value={email}
                className='form-control'
                type='text'
              />
            </div>
            <div className='form-group'>
              <label className='text-light'>Password</label>
              <input
                onChange={changeHandler('password')}
                value={password}
                className='form-control'
                type='password'
              />
            </div>
            <button onClick={onSubmit} className='btn btn-success btn-block'>
              Login
            </button>
          </form>
        </div>
      </div>
    );
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <p>Redirect to admin now</p>;
      } else {
        return <p>Redirect to user Dashboard</p>;
      }
    }
    if (isAutheticated()) {
      return <Redirect to='/' />;
    }
  };

  const loadingMessage = () => {
    return (
      isLoading && (
        <div className='row'>
          <div className='col-md-6 offset-sm-3 text-left'>
            <div className='alert alert-info'>
              <h2>Loading...</h2>
            </div>
          </div>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div className='row'>
        <div className='col-md-6 offset-sm-3 text-left'>
          <div
            className='alert alert-danger'
            style={{ display: error ? '' : 'none' }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base title='SignIn page' description='A page for user to signin'>
      {loadingMessage()}
      {errorMessage()}
      {signinForm()}
      {performRedirect()}
      <p className='text-light text-center'>{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signin;
