import React, { useState, useEffect } from 'react';
import { isAutheticated } from '../auth/helper';
import { emptyCart, loadCart } from './helper/CartHelper';
import { Link } from 'react-router-dom';

const StripeCheckout = ({
  cartItems,
  reload = undefined,
  setReload = (f) => f,
}) => {
  const [state, setState] = useState({
    loading: false,
    success: false,
    error: '',
    address: '',
  });

  const { loading, success, error, address } = state;

  const { user, authToken } = isAutheticated();

  const getTotalPrice = () => {
    let amount = 0;
    cartItems.map((item) => {
      amount = amount + item.price;
    });
    return amount;
  };

  const showStripButton = () => {
    return isAutheticated() ? (
      <button className='btn btn-success'>Pay With Stripe</button>
    ) : (
      <Link to='/signin'>
        <button className='btn btn-warning'>Signin To Buy</button>
      </Link>
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

  return (
    <div>
      <h1 className='text-white'>Stripe checkout: {getTotalPrice()}</h1>
      {showStripButton()}
    </div>
  );
};

export default StripeCheckout;
