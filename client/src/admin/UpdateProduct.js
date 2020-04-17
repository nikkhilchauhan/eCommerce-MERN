import React, { useEffect } from 'react';
import Base from '../core/Base';

const UpdateProduct = (props) => {
  useEffect(() => {
    let userId = '';
    if (props.match.params) {
      userId = props.match.userId;
    }
    console.log(userId);
  }, []);
  return (
    <Base
      title='Update product page'
      description='Here you can upate your product'
      className='container'
    >
      <h1>Update product</h1>
    </Base>
  );
};

export default UpdateProduct;
