import React, { useEffect } from 'react';
import Base from '../core/Base';

const ManageCategories = () => {
  useEffect(() => {
    document.title = 'eCommerce | Manage Categories';
  }, []);
  return (
    <Base
      title='Manage Categories page'
      description='Here you can manage all of your categories'
    >
      <h1>My assigment - ManageCategories</h1>
    </Base>
  );
};

export default ManageCategories;
