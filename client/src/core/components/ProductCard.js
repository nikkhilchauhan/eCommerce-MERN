import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import ImageHelper from './ImageHelper';
import { addItemToCart, removeItemFromCart } from '../helper/CartHelper';

const ProductCard = ({
  product,
  addToCart = true,
  reload = undefined,
  setReload = (value) => value,
  // function(value) { return value }
}) => {
  const [state, setState] = useState({
    redirect: false,
    count: product.count,
  });

  const { redirect } = state;

  const getRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to='/cart' />;
    }
  };

  const addMeToCart = () => {
    addItemToCart(product, () => {
      setState({ ...state, redirect: true });
    });
  };

  const showAddToCart = () => {
    return (
      addToCart && (
        <div className='row'>
          <div className='col-12'>
            <button
              onClick={addMeToCart}
              className='btn btn-block btn-outline-success mt-2 mb-2'
            >
              Add to Cart
            </button>
          </div>
        </div>
      )
    );
  };

  const showRemoveFromCart = () => {
    return (
      !addToCart && (
        <div className='row'>
          <div className='col-12'>
            <button
              onClick={() => {
                removeItemFromCart(product._id);
                setReload(!reload);
              }}
              className='btn btn-block btn-outline-danger mt-2 mb-2'
            >
              Remove from cart
            </button>
          </div>
        </div>
      )
    );
  };

  return (
    <div className='card text-white bg-dark border border-info mb-2'>
      <div className='card-header lead'>{product.description}</div>
      <div className='card-body'>
        {getRedirect(redirect)}
        <ImageHelper product={product} />
        <p className='lead bg-success font-weight-normal text-wrap'>
          {product.name}
        </p>
        <h6 className='badge badge-success rounded py-2 px-4'>
          ${product.price}
        </h6>
        {showAddToCart()}
        {showRemoveFromCart()}
      </div>
    </div>
  );
};

export default ProductCard;
