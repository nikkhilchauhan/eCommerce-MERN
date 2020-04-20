import React, { useEffect, useState } from 'react';
import Base from '../core/Base';
import { getCategory, updateCategory } from './helper/adminapicall';
import { isAutheticated } from '../auth/helper';

const UpdateCategory = ({ match }) => {
  const { user, authToken } = isAutheticated();
  const [state, setState] = useState({
    name: '',
    category: [],
    error: '',
    loading: '',
    success: false,
  });

  const { name, category, error, success } = state;

  useEffect(() => {
    preLoad(match.params.categoryId);
  }, []);

  const preLoad = async (categoryId) => {
    try {
      const gotCategory = await getCategory(categoryId);
      if (gotCategory.error) {
        return setState({
          ...state,
          error: gotCategory.error,
          success: false,
          loading: false,
          category: [],
        });
      }
      setState({
        ...state,
        category: gotCategory,
        name: gotCategory.name,
        error: '',
        success: true,
        loading: false,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const changeHandler = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };

  const onSubmit = async () => {
    try {
      const updatedCategory = await updateCategory(
        user._id,
        authToken,
        match.params.categoryId,
        { name }
      );
      if (updatedCategory.error) {
        return setState({
          ...state,
          error: updatedCategory.error,
          success: false,
          loading: false,
        });
      }
      setState({
        ...state,
        category: updatedCategory,
        name: updatedCategory.name,
        success: true,
        error: '',
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Base
      title='Update category page'
      description='Here you can update your category'
      className='container bg-info'
    >
      <div className='row d-flex justify-content-center main-height'>
        <div className='col-6'>
          <div className='form-group'>
            <input onChange={changeHandler('name')} value={name} type='text' />
          </div>
          <button className='btn btn-info' onClick={() => onSubmit()}>
            Update category
          </button>
        </div>
      </div>
    </Base>
  );
};
export default UpdateCategory;
