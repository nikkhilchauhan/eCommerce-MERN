import React, { useState, useEffect } from 'react';
import Base from '../core/Base';
import { isAutheticated } from '../auth/helper';
import { Link } from 'react-router-dom';
import { createCategory } from './helper/adminapicall';

const AddCategory = (props) => {
  useEffect(() => {
    document.title = 'eCommerce | Add Category';
  }, []);

  const [state, setState] = useState({
    name: '',
    error: false,
    success: false,
  });

  const { name, error, success } = state;

  const { user, authToken } = isAutheticated();

  const handleChange = (event) => {
    setState({ ...state, name: event.target.value, error: '' });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setState({ ...state, error: '', success: false });
    //   name is passed as Object because we've used JSON.stringify in createCategory()
    createCategory(user._id, authToken, { name })
      .then((data) => {
        if (data.error) {
          setState({ ...state, error: data.error });
        } else {
          setState({ ...state, name: '', error: '', success: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const goBack = () => {
    return (
      <div className='mt-1'>
        <Link to='/admin/dashboard' className='btn btn-sm text-white mb-3'>
          <i className='fas fa-backward'></i> Go Back
        </Link>
      </div>
    );
  };

  const myCategoryForm = () => {
    return (
      <form>
        <div className='form-group'>
          <p className='lead'>Enter the category name</p>
          <input
            onChange={handleChange}
            value={name}
            type='text'
            className='form-control my-3 autoFocus required '
            placeholder='eg.. Summer'
          />
          <button onClick={onSubmit} className='btn btn-outline-info'>
            Create Category
          </button>
        </div>
      </form>
    );
  };

  const successMessage = () => {
    return (
      <div className='row'>
        <div className='col-md-8 offset-sm-3 text-left'>
          <div
            className='alert alert-success'
            style={{ display: success ? '' : 'none' }}
          >
            <i className='fas fa-check-circle'> </i> Category created
            successfully.
          </div>
        </div>
      </div>
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
    <Base
      title='Create a category'
      description='You an add a new categor for new t-shirt of your choice'
      className='container bg-info p-5'
    >
      {goBack()}
      {successMessage()}
      {errorMessage()}
      <div className='row bg-white rounded'>
        <div className='col-md-8 offset-md-2'>{myCategoryForm()}</div>
      </div>
      <p>{JSON.stringify(state)}</p>
    </Base>
  );
};

export default AddCategory;
