import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import SignIn from './pages/sign-in';
import SignUp from './pages/sign-up';
import UserManagement from './pages/user-management';
import {
  SIGN_UP_ROUTE,
  SIGN_IN_ROUTE,
  DASHBOARD_ROUTE,
  DEFAULT_ROUTE,
  HOME_PAGE_ROUTE,
  NEW_FANFIC_PAGE_ROUTE,
  USER_PAGE_ROUTE,
} from './constant/routs';
import PrivateRoute from './components/private-route';
import { store, persistor } from './redux/store';
import UnauthorizedRoute from './components/unauthorized-route';
import HomePage from './pages/home-page';
import NewFanficPage from './pages/new-fanfic-page';
import UserPage from './pages/user-page';

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Switch>
          <UnauthorizedRoute component={SignIn} exact path={SIGN_IN_ROUTE} />
          <UnauthorizedRoute component={SignUp} exact path={SIGN_UP_ROUTE} />
          <Route component={HomePage} exact path={HOME_PAGE_ROUTE} />
          <PrivateRoute component={UserManagement} exact path={DASHBOARD_ROUTE} />
          <PrivateRoute component={UserManagement} exact path={DEFAULT_ROUTE} />
          <PrivateRoute component={NewFanficPage} exact path={NEW_FANFIC_PAGE_ROUTE} />
          <PrivateRoute component={UserPage} exact path={USER_PAGE_ROUTE} />
        </Switch>
      </Router>
    </PersistGate>
  </Provider>
);
export default App;
