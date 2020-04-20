import React from 'react';

const ImageHelper = ({ product }) => {
  const imageURL = product
    ? `/api/product/photo/${product._id}`
    : 'https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';
  return (
    <div className='rounded border border-success p-2'>
      <img
        src={imageURL}
        alt='photo'
        style={{ width: '90%', height: 'auto' }}
        className='mb-3 rounded'
      />
    </div>
  );
};

export default ImageHelper;
