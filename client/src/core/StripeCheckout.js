import React, { useState, useEffect } from 'react';
import { isAutheticated } from '../auth/helper';
import { emptyCart, loadCart } from './helper/CartHelper';
import { Link } from 'react-router-dom';
import StripeCheckoutButton from 'react-stripe-checkout';
import { createOrder } from './helper/OrderHelper';

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

  const makePayment = (token) => {
    const body = {
      token,
      cartItems,
    };
    const headers = {
      'Content-type': 'application/json',
    };
    return fetch(`/api/stripepayment`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        const { status } = response;
        if (status === 200) {
          setState({ success: true });
          emptyCart(() => {
            console.log('Did we crashed?');
          });
          // Create order
          const orderData = {
            products: cartItems,
            transaction_id: response.id,
            amount: response.amount,
          };
          createOrder(user._id, authToken, orderData);
          // Reload
          setReload(!reload);
        }
      })
      .catch((error) => console.log(error));
  };

  const showStripButton = () => {
    return isAutheticated() ? (
      <StripeCheckoutButton
        stripeKey='pk_test_1Qja4RGzrTjFfkTGd9j479If00ld1m9Bqe'
        token={makePayment}
        amount={getTotalPrice() * 100}
        name='Buy T-Shirts'
        billingAddress
        shippingAddress
      >
        <button className='btn btn-success'>Pay With Stripe</button>
      </StripeCheckoutButton>
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
            <i className='fas fa-check-circle'> </i> Payment successful...
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {errorMessage()}
      {successMessage()}
      <h1 className='text-white'>Stripe checkout: {getTotalPrice()}</h1>
      {showStripButton()}
    </div>
  );
};

export default StripeCheckout;
