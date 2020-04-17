import React, { useState, useEffect } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { getCategories, createProduct } from './helper/adminapicall';
import { isAutheticated } from '../auth/helper';

const AddProduct = () => {
  const { user, authToken } = isAutheticated();

  useEffect(() => {
    document.title = 'eCommerce | Add Product';
    preLoad();
  }, []);

  const [state, setState] = useState({
    name: '',
    description: '',
    price: '',
    categories: [],
    stock: '',
    photo: '',
    loading: false,
    error: '',
    createdProduct: '',
    formData: '',
  });

  const {
    name,
    description,
    price,
    categories,
    stock,
    loading,
    error,
    createdProduct,
    formData,
  } = state;

  const preLoad = () => {
    getCategories().then((data) => {
      if (data.error) {
        setState({ ...state, error: data.error });
      } else {
        // 'new FormData()' to initialize formData - given by react
        setState({ ...state, categories: data, formData: new FormData() });
      }
    });
  };

  const handleChange = (name) => (event) => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setState({ ...state, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setState({ ...state, error: '', loading: true });
    createProduct(user._id, authToken, formData)
      .then((data) => {
        if (data.error) {
          setState({ ...state, error: data.error });
        } else {
          setState({
            ...state,
            name: '',
            description: '',
            price: '',
            categories: '',
            photo: '',
            stock: '',
            loading: false,
            error: false,
            createdProduct: data.name,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const createProductForm = () => (
    <form>
      <span>Product image</span>
      <div className='form-group'>
        <label className='btn btn-block btn-success'>
          <input
            onChange={handleChange('photo')}
            type='file'
            name='photo'
            accept='image'
            placeholder='choose a file'
          />
        </label>
      </div>
      <div className='form-group'>
        <input
          onChange={handleChange('name')}
          name='photo'
          className='form-control'
          placeholder='Product name'
          value={name}
        />
      </div>
      <div className='form-group'>
        <textarea
          onChange={handleChange('description')}
          name='photo'
          className='form-control'
          placeholder='Description'
          value={description}
        />
      </div>
      <div className='form-group'>
        <input
          onChange={handleChange('price')}
          type='number'
          className='form-control'
          placeholder='Price'
          value={price}
        />
      </div>
      <div className='form-group'>
        <select
          onChange={handleChange('category')}
          className='form-control'
          placeholder='Category'
        >
          <option>Select category</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className='form-group'>
        <input
          onChange={handleChange('stock')}
          type='number'
          className='form-control'
          placeholder='Stock'
          value={stock}
        />
      </div>

      <button type='submit' onClick={onSubmit} className='btn btn-success mb-3'>
        Create Product
      </button>
    </form>
  );

  const goBack = () => {
    return (
      <div className='mt-1'>
        <Link to='/admin/dashboard' className='btn btn-sm text-white  mb-3'>
          <i className='fas fa-backward'></i> Go Back
        </Link>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div className='row'>
        <div className='col-12 text-left'>
          <div
            className='alert alert-success'
            style={{ display: createdProduct ? '' : 'none' }}
          >
            <i className='fas fa-check-circle'> </i> Product created
            successfully.
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className='row'>
        <div className='col-12  text-left'>
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

  const loadingMessage = () => {
    return (
      loading && (
        <div className='row'>
          <div className='col-12  text-left'>
            <div className='alert alert-info'>
              <h2>Loading...</h2>
            </div>
          </div>
        </div>
      )
    );
  };
  return (
    <Base
      title='Add Product page'
      description='Here you can add new products'
      className='bg-info container'
    >
      <div className='row text-white rounded'>
        <div className='col-mg-8 offset-md-2'>
          {goBack()}
          {loadingMessage()}
          {errorMessage()}
          {successMessage()}
          {createProductForm()}
        </div>
      </div>
    </Base>
  );
};

export default AddProduct;
