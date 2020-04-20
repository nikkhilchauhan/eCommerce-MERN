import React, { useEffect, useState } from 'react';
import Base from './Base';
import ProductCard from './components/ProductCard';
import { getProducts } from './helper/coreapicalls';

export default function Home(props) {
  const [state, setState] = useState({
    products: [],
    error: '',
  });
  const { products, error } = state;

  useEffect(() => {
    document.title = 'eCommerce | Home';
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const products = await getProducts();
      if (products.error) {
        return setState({ ...state, products: [], error: products.error });
      }
      setState({ ...state, products: products });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Base title='Home Page' description='Welcome to T-shirt store'>
      <div className='row text-center'>
        {products &&
          products.map((product, index) => (
            <div key={index} className='col-lg-3 col-md-6'>
              <ProductCard product={product} />
            </div>
          ))}
      </div>
    </Base>
  );
}
