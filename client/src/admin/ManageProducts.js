import React, { useState, useEffect } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { isAutheticated } from '../auth/helper';
import { getProducts, deleteProduct } from './helper/adminapicall';

const ManageProducts = () => {
  const [state, setState] = useState({
    switcher: 'UPDATE',
    products: [],
    success: '',
    error: '',
    loading: false,
  });

  const { switcher, products, success, error, loading } = state;

  useEffect(() => {
    preLoad();
  }, []);

  const { user, authToken } = isAutheticated();

  const preLoad = () => {
    getProducts()
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setState({ ...state, products: data });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteMyProduct = (productId) => {
    setState({
      ...state,
      loading: true,
      success: false,
      error: '',
    });
    deleteProduct(user._id, authToken, productId)
      .then((data) => {
        if (data.error) {
          setState({
            ...state,
            error: data.error,
            success: false,
            loading: false,
          });
        } else {
          //  Using 'filter()' instead of calling 'preLoad()' to reduce server calls
          const filteredProducts = products.filter(
            (product) => product._id !== productId
          );
          console.log(filteredProducts);
          setState({
            ...state,
            products: filteredProducts,
            success: true,
            loading: false,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  //   const updateProduct = () => {
  //     return <h1>Update Product</h1>;
  //   };
  //   const deleteProduct = () => {
  //     return <h1>Delete Product</h1>;
  //   };

  //   const switchTemp = (temp) => {
  //     switch (temp) {
  //       case 'UPDATE':
  //         return updateProduct();
  //       case 'DELETE':
  //         return deleteProduct();
  //       default:
  //         break;
  //     }
  //   };

  const goBack = () => {
    return (
      <div className='mt-1'>
        <Link to='/admin/dashboard' className='btn btn-sm text-white  mb-3'>
          <i className='fas fa-backward'></i> Go Back
        </Link>
      </div>
    );
  };
  const loadingMessage = () => {
    return (
      loading && (
        <div className='row'>
          <div className='col-lg-8 offset-lg-1 col-md-12  text-left'>
            <div className='alert alert-info'>
              <h2>Loading...</h2>
            </div>
          </div>
        </div>
      )
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
            <i className='fas fa-check-circle'> </i> Product deleted
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
      title='Manage Products Page'
      description='Here you can manage all of your products'
      className='container'
    >
      {goBack()}
      <div className='row text-center'>
        <div className='col-12'>
          <h3 className='mb-4 text-white'>All Products</h3>
          {errorMessage()}
          {successMessage()}
          {loadingMessage()}
        </div>
      </div>
      <div className='row text-center'>
        {products.map((product, index) => (
          <div
            key={index}
            className='col-lg-3 col-md-5 product-card card text-center'
          >
            <p className='product-stock'>
              Sold:
              <span className='font-weight-bold'>{product.sold}</span>
            </p>
            <p className='product-stock'>
              Stock left:
              <span className='font-weight-bold'>{product.stock}</span>
            </p>
            <h5 className='product-stock'>
              Price:$
              <span className='font-weight-bold'>{product.price}</span>
            </h5>
            <h5>{product.name}</h5>
            <p className='product-des'>{product.description}</p>
            <button className='btn btn-info rounded mb-2'>
              <i className='fas fa-edit'></i> Update
            </button>
            <button
              onClick={() => {
                deleteMyProduct(product._id);
              }}
              className='btn btn-danger rounded'
            >
              <i className='fas fa-trash'></i> Delete
            </button>
          </div>
        ))}
      </div>
      {/* <div className='row '>
        <div className='col-3 card bg-info mr-1 text-white'>
          <ul>
            <div>
              <button
                onClick={() => {
                  setState({ ...state, switcher: 'UPDATE' });
                }}
                className=' btn-left  rounded'
              >
                <i className='fas fa-edit'></i> UPDATE Product
              </button>
            </div>
            <div>
              <button
                onClick={() => {
                  setState({ ...state, switcher: 'DELETE' });
                }}
                className='btn-left rounded'
              >
                <i className='fas fa-trash'></i> DELETE Product
              </button>
            </div>
          </ul>
        </div>
        <div className='col-8 card bg-info'>{switchTemp(switcher)}</div>
      </div> */}
    </Base>
  );
};

export default ManageProducts;
