import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import getToken from '../../redux/selectors/selector';
import { SIGN_IN_ROUTE } from '../../constant/routs';

const PrivateRoute = (props) => {
  if (useSelector(getToken)) {
    return <Route {...props} />;
  }

  return <Redirect to={SIGN_IN_ROUTE} />;
};

export default PrivateRoute;
