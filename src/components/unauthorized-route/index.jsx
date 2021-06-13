import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import getToken from '../../redux/selectors/selector';
import { DASHBOARD_ROUTE } from '../../constant/routs';

const UnauthorizedRoute = (props) => {
  if (!useSelector(getToken)) {
    return <Route {...props} />;
  }

  return <Redirect to={DASHBOARD_ROUTE} />;
};

export default UnauthorizedRoute;
