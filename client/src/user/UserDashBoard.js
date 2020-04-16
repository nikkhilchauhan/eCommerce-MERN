import React, { useEffect } from 'react';
import Base from '../core/Base';

const UserDashBoard = (props) => {
  useEffect(() => {
    document.title = 'eCommerce | A.Dashboard';
  }, []);
  return (
    <Base title='UserDashBoard page'>
      <h1>This is UserDashBoard page</h1>
    </Base>
  );
};

export default UserDashBoard;
