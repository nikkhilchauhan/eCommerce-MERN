import React, { useEffect, useState } from 'react';
import { deleteCategory, getCategories } from './helper/adminapicall';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { isAutheticated } from '../auth/helper';

const ManageCategories = () => {
  const { user, authToken } = isAutheticated();

  const [state, setState] = useState({
    error: '',
    success: false,
    categories: [],
  });

  const { error, success, categories } = state;

  useEffect(() => {
    document.title = 'eCommerce | Manage Categories';
    preLoad();
  }, []);

  const preLoad = async () => {
    try {
      const categories = await getCategories();
      if (categories.error) {
        return setState({
          ...state,
          error: categories.error,
          loading: false,
          category: '',
          success: false,
        });
      }
      setState({
        ...state,
        categories: categories,
        loading: false,
        error: false,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const delelteCategory = async (categoryId) => {
    try {
      const deletedCategory = await deleteCategory(
        user._id,
        authToken,
        categoryId
      );
      if (deletedCategory.error) {
        return setState({
          ...state,
          error: deletedCategory.error,
          success: false,
          loading: false,
        });
      }
      const filteredCategory = categories.filter(
        (category) => category._id !== categoryId
      );
      setState({
        ...state,
        categories: filteredCategory,
        loading: false,
        error: '',
        success: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

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
            style={{ display: success ? '' : 'none' }}
          >
            <i className='fas fa-check-circle'> </i> Category deleted
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
  const gettingCategoriesMessage = () => {
    return (
      <div className='row'>
        <div className='col-12  text-left'>
          <div
            className='alert alert-danger'
            style={{ display: !categories ? '' : 'none' }}
          >
            <i className='fas fa-spinner'></i> Loading categories...
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base
      title='Manage Categories page'
      description='Here you can manage all of your categories'
      className='container bg-info main-height'
    >
      {goBack()}
      {successMessage()}
      {errorMessage()}
      {gettingCategoriesMessage()}
      {categories &&
        categories.map((category, index) => (
          <div key={index} id='categories' className='mb-2'>
            <div className='row text-center d-flex justify-content-around'>
              <div className='col-4 text-white d-flex align-items-center'>
                <h5>{category.name}</h5>
              </div>
              <div className='col-4'>
                <Link
                  to={`/admin/update/category/${category._id}`}
                  className='btn btn-success rounded'
                >
                  <i className='fas fa-edit'></i> UPDATE
                </Link>
              </div>
              <div className='col-4'>
                <button
                  onClick={() => {
                    delelteCategory(category._id);
                  }}
                  className='btn btn-danger rounded'
                >
                  <i className='fas fa-trash'></i> DELETE
                </button>
              </div>
            </div>
          </div>
        ))}
    </Base>
  );
};

export default ManageCategories;
