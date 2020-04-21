import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Base from './Base';
import { loadCart } from './helper/CartHelper';
import ProductCard from './components/ProductCard';
import StripeCheckout from './StripeCheckout';

export default function Cart(props) {
  const [state, setState] = useState({
    cartItems: [],
  });
  const { cartItems } = state;

  // To forcefully reload CART component when item is removed from cart
  const [reload, setReload] = useState(false);

  useEffect(() => {
    document.title = 'eCommerce | Cart';
    setState({ ...state, cartItems: loadCart() });
  }, [reload]);

  const loadItems = () => {
    return (
      <div>
        <h3 className='text-white'>Your cart</h3>
        {cartItems &&
          cartItems.map((item, index) => (
            <ProductCard
              key={index}
              product={item}
              addToCart={false}
              reload={reload}
              setReload={setReload}
            />
          ))}
      </div>
    );
  };

  const loadCheckout = () => {
    return (
      <StripeCheckout
        cartItems={cartItems}
        reload={reload}
        setReload={setReload}
      />
    );
  };

  const goBack = () => {
    return (
      <div className='mt-1'>
        <Link to='/' className='btn btn-sm text-white mb-3'>
          <i className='fas fa-backward'></i> Go Back
        </Link>
      </div>
    );
  };
  return (
    <Base
      title='Cart Page'
      description='Hey, this is your cart'
      className='container'
    >
      <div className='row'>
        <div className='col-12'>{goBack()}</div>
      </div>
      <div className='row text-center'>
        <div className='col-4'>{loadItems()}</div>
        <div className='col-8'>{loadCheckout()}</div>
      </div>
    </Base>
  );
}
