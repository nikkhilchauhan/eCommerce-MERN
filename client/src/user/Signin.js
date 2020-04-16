import React, { useState, useEffect } from 'react';
import Base from '../core/Base';
import { Link, Redirect } from 'react-router-dom';
import { signin, authenticate, isAutheticated } from '../auth/helper/';

const Signin = (props) => {
  useEffect(() => {
    document.title = props.title;
  }, []);
  const [values, setValues] = useState({
    email: 'nikhilchauhan0018@gmail.com',
    password: '123456',
    error: '',
    didRedirect: false,
    isLoading: false,
  });

  const { email, password, error, didRedirect, isLoading } = values;
  // Checks if user is already authenticated
  const { user } = isAutheticated();

  const changeHandler = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: '', isLoading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, isLoading: false });
        } else {
          authenticate(
            data,
            // Because there a next in authenticate function we can fire up a callback
            () => {
              setValues({
                ...values,
                didRedirect: true,
                isLoading: false,
              });
            }
          );
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
      if (user && user.is_admin === 1) {
        return <Redirect to='/admin/dashboard' />;
      } else {
        return <Redirect to='/user/dashboard' />;
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
        <div className='col-md-8 offset-sm-3 text-left'>
          <div
            className='alert alert-danger'
            style={{ display: error ? '' : 'none' }}
          >
            <i className='fas fa-exclamation-circle'></i> {error}
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
