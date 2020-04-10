import React, { Children } from 'react';
import Navbar from './Navbar';

const Base = ({
  title = 'This is title',
  description = 'This is description',
  className = 'bg-dark text-white p-4',
  children,
}) => {
  return (
    <div>
      <Navbar />
      <div className='container-fluid'>
        <div className='jubotron bg-dark text-white text-center'>
          <h2 className='display-4'>{title}</h2>
          <p className='lead'>{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
      <footer className='bg-dark mt-auto py-3'>
        <div className='container-fluid bg-success text-white text-center py-3'>
          <h4>Got questions?, feel free to reach us out.</h4>
          <button className='btn btn-warning btn-lg'>Contact us</button>
        </div>
        <div className='container  text-center mt-3'>
          <span className='text-muted'>
            An amazing place to buy <span className='text-white'>T-Shirt</span>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Base;
