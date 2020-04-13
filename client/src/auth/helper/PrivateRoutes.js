import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAutheticated } from './index';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      render={(props) =>
        isAutheticated() ? (
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

export default PrivateRoute;
