import React, { useEffect } from 'react';
import Base from '../core/Base';
import { isAutheticated } from '../auth/helper';
import { Link } from 'react-router-dom';

const AdminDashboard = (props) => {
  useEffect(() => {
    document.title = 'eCommerce | A.Dashboard';
  }, []);

  const {
    user: { first_name, last_name, email },
  } = isAutheticated();

  const adminLeftSide = () => {
    return (
      <div className='card'>
        <h6 className='card-header bg-dark text-white border'>
          <i className='fas fa-user-lock'></i> Admin Navigation
        </h6>
        <ul className='list-group'>
          <li className='list-group-item'>
            <Link to='/admin/create/category' className='nav-link text-info'>
              <i className='fas fa-edit'></i> Create categories
            </Link>
          </li>
          <li className='list-group-item'>
            <Link to='/admin/create/product' className='nav-link text-info'>
              <i className='fas fa-edit'></i> Create products
            </Link>
          </li>
          <li className='list-group-item'>
            <Link to='/admin/products' className='nav-link text-info'>
              <i className='fas fa-exchange-alt'></i> Manage Products
            </Link>
          </li>
          <li className='list-group-item'>
            <Link to='/admin/orders' className='nav-link text-info'>
              <i className='fas fa-exchange-alt'></i> Manage Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };
  const adminRightSide = () => {
    return (
      <div className='card mb-4'>
        <h6 className='card-header'>
          Admin information &nbsp;
          <span className='badge badge-danger'>Admin area</span>
        </h6>
        <ul className='list-group'>
          <li className='list-group-item'>
            <span className='badge badge-success mr-2'>NAME: </span>
            {first_name} {last_name}
          </li>
          <li className='list-group-item'>
            <span className='badge badge-success mr-2'>EMAIL: </span>
            {email}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Base
      title='Welcome to Admin Dashboard'
      description='Manage all of your products here'
      className='container bg-info p-5'
    >
      <div className='row'>
        <div className='col-3'>{adminLeftSide()}</div>
        <div className='col-9'>{adminRightSide()}</div>
      </div>
    </Base>
  );
};

export default AdminDashboard;
