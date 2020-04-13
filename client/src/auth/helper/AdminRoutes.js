import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAutheticated } from './index';

const AdminRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      render={(props) =>
        isAutheticated() && isAutheticated().user.is_admin === 1 ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default AdminRoute;
