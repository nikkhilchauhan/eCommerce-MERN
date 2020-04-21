import React, { useEffect, useState } from 'react';
import Base from './Base';
import { loadCart } from './helper/CartHelper';
import ProductCard from './components/ProductCard';

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
        <h3>This section is to load products</h3>
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
      <div>
        <h3>This section is for checkout</h3>
      </div>
    );
  };

  return (
    <Base title='Cart Page' description='Hey, this is your cart '>
      <div className='row text-center'>
        <div className='col-7'>{loadItems()}</div>
        <div className='col-5'>{loadCheckout()}</div>
      </div>
    </Base>
  );
}
