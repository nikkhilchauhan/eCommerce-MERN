import React, { useState, useEffect } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { getCategories } from './helper/adminapicall';

const AddProduct = () => {
  useEffect(() => {
    document.title = 'eCommerce | Add Product';
    preLoad();
  }, []);

  const [state, setState] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    categories: '',
    stock: '',
    photo: '',
    loading: false,
    error: '',
    createdProduct: '',
    getRedirect: false,
    formData: '',
  });

  const {
    name,
    description,
    price,
    category,
    categories,
    stock,
    photo,
    loading,
    error,
    createdProduct,
    getRedirect,
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
    setState({ ...state, [name]: event.target.value });
  };

  const onSubmit = () => {};

  const createProductForm = () => (
    <form>
      <span>Post photo</span>
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
          placeholder='Name'
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
          <option>Select</option>
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
  return (
    <Base
      title='Add Product page'
      description='Here you can add new products'
      className='bg-info container'
    >
      {goBack()}
      <div className='row text-white rounded'>
        <div className='col-mg-8 offset-md-2'>{createProductForm()}</div>
      </div>
      {JSON.stringify(state)}
    </Base>
  );
};

export default AddProduct;
