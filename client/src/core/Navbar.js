import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: '#28a745' };
  } else {
    return { color: '#d1d1d1' };
  }
};

const Navbar = ({ history }) => {
  return (
    <div>
      <ul className='nav nav-tabs bg-dark'>
        <li className='nav-item'>
          <Link style={currentTab(history, '/')} to='/' className='nav-link'>
            Home
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            style={currentTab(history, '/cart')}
            to='/cart'
            className='nav-link'
          >
            Cart
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            style={currentTab(history, '/user/dashboard')}
            to='/user/dashboard'
            className='nav-link'
          >
            Dashboard
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            style={currentTab(history, '/admin')}
            to='/admin'
            className='nav-link'
          >
            Admin
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            style={currentTab(history, '/signup')}
            to='/signup'
            className='nav-link'
          >
            Signup
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            style={currentTab(history, '/signin')}
            to='/signin'
            className='nav-link'
          >
            Signin
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            style={currentTab(history, '/logout')}
            to='/logout'
            className='nav-link'
          >
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default withRouter(Navbar);
