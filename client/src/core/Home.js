import React, { useEffect } from 'react';
import Base from './Base';

export default function Home(props) {
  useEffect(() => {
    document.title = props.title;
  }, []);

  return (
    <Base title='Home Page' description='Welcome to T-shirt store'>
      <div className='row text-center'>
        <div className='col-4'>
          <button className='btn btn-success'>TEST</button>
        </div>

        <div className='col-4'>
          <button className='btn btn-success'>TEST</button>
        </div>
        <div className='col-4'>
          <button className='btn btn-success'>TEST</button>
        </div>
      </div>
    </Base>
  );
}
