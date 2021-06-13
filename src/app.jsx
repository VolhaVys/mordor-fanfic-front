import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import SignIn from './pages/sign-in';
import SignUp from './pages/sign-up';
import Dashboard from './pages/dashboard';
import {
  SIGN_UP_ROUTE, SIGN_IN_ROUTE, INITIAL_PAGE_ROUTE, DASHBOARD_ROUTE,
} from './constant/routs';
import InitialPage from './pages/initial-page';
import PrivateRoute from './components/private-route';
import { store, persistor } from './redux/store';
import UnauthorizedRoute from './components/unauthorized-route';

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Switch>
          <UnauthorizedRoute component={SignIn} exact path={SIGN_IN_ROUTE} />
          <UnauthorizedRoute component={SignUp} exact path={SIGN_UP_ROUTE} />
          <UnauthorizedRoute component={InitialPage} exact path={INITIAL_PAGE_ROUTE} />
          <PrivateRoute component={Dashboard} exact path={DASHBOARD_ROUTE} />
        </Switch>
      </Router>
    </PersistGate>
  </Provider>
);
export default App;
