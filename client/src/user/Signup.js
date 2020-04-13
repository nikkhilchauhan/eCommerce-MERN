import React, { useState } from 'react';
import Base from '../core/Base';
import { signup } from '../auth/helper';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [values, setValues] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    error: '',
    isSuccess: false,
  });

  const { first_name, last_name, email, password, error, isSuccess } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ first_name, last_name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, isSuccess: false });
        } else {
          setValues({
            ...values,
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            error: '',
            isSuccess: true,
          });
        }
      })
      .catch(console.log('Error in signup'));
  };

  const signUpForm = () => {
    return (
      <div className='row'>
        <div className='col-md-6 offset-sm-3 text-left'>
          <form>
            <div className='row'>
              <div className='col-6'>
                <div className='form-group'>
                  <label className='text-light'>First name</label>
                  <input
                    className='form-control'
                    onChange={handleChange('first_name')}
                    type='text'
                    value={first_name}
                  />
                </div>
              </div>
              <div className='col-6'>
                <div className='form-group'>
                  <label className='text-light'>Last name</label>
                  <input
                    className='form-control'
                    onChange={handleChange('last_name')}
                    type='text'
                    value={last_name}
                  />
                </div>
              </div>
            </div>

            <div className='form-group'>
              <label className='text-light'>Email</label>
              <input
                className='form-control'
                onChange={handleChange('email')}
                value={email}
                type='email'
              />
            </div>

            <div className='form-group'>
              <label className='text-light'>Password</label>
              <input
                onChange={handleChange('password')}
                className='form-control'
                type='password'
                value={password}
              />
            </div>
            <button onClick={onSubmit} className='btn btn-success btn-block'>
              Register
            </button>
          </form>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div className='row'>
        <div className='col-md-6 offset-sm-3 text-left'>
          <div
            className='alert alert-success'
            style={{ display: isSuccess ? '' : 'none' }}
          >
            New account created successfully. <Link to='/signin'>Login</Link>
          </div>
        </div>
      </div>
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
    <Base title='Sign up page' description='A page for user to sign up!'>
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
      <p className='text-light text-center'>{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signup;
