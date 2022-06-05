import React, { Fragment, useEffect, useMemo } from 'react';
import {
  ChakraProvider,
  Box,
  Grid,
  extendTheme,
  withDefaultColorScheme,
} from '@chakra-ui/react';
import Header from './components/common/Header';
import Login from './components/auth/Login';
import { useSelector } from 'react-redux';
import { _isAdmin, _user } from './store/selectors/App';
import { IUser } from './models/user';
import { checkLogin } from './store/thunks/App';
import { PageLayout } from './components/layout';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import BaseRoute from './apps/baseRoute';
import TaskRoute from './apps/taskRoute';
import { navigationRef } from './services/navigation';
import PrivacyPolicy from './apps/privacyPolicy';
import InfomationRoute from './apps/infomationRoute';
import routes from './constants/routes';

export const App = () => {
  const customTheme = extendTheme(
    withDefaultColorScheme({
      colorScheme: 'blue',
    })
  );

  const user: IUser = useSelector(_user);
  const isAdmin: boolean = useSelector(_isAdmin);

  useEffect(() => {
    checkLogin();
  }, []);

  const mainApp = useMemo(() => {
    if (!user)
      return (
        <Switch>
          <Route path={routes.LOGIN}>
            <Login />
          </Route>
          <Route path={routes.PRIVACY_POLICY}>
            <PrivacyPolicy />
          </Route>
          <Route path='*'>
            <Redirect to={routes.LOGIN} />
          </Route>
        </Switch>
      );

    if (!isAdmin) {
      return (
        <Switch>
          <Route path={routes.TASK_ROUTE}>
            <TaskRoute />
          </Route>
          <Route path={routes.LOGIN}>
            <Login />
          </Route>
          <Route path={routes.PRIVACY_POLICY}>
            <PrivacyPolicy />
          </Route>
          {/* <Route path={routes.INFORMATIOM_ROUTE}>
            <InfomationRoute />
          </Route> */}
          {/* <Route path={routes.HOME}>
            <Redirect to='/' />
          </Route> */}
          <Route exact path='/'>
            <Redirect to={routes.TASK_ROUTE} />
          </Route>
          <Route path='*'>
            <Redirect to={routes.TASK_ROUTE} />
          </Route>
        </Switch>
      );
    }

    return (
      <Switch>
        <Route path={routes.BASE_ROUTE}>
          <BaseRoute />
        </Route>
        <Route path={routes.TASK_ROUTE}>
          <TaskRoute />
        </Route>
        <Route path={routes.REPORTS}>
          <div>reports</div>
        </Route>
        <Route path={routes.LOGIN}>
          <Login />
        </Route>
        <Route path={routes.PRIVACY_POLICY}>
          <PrivacyPolicy />
        </Route>
        {/* <Route path={routes.INFORMATIOM_ROUTE}>
          <InfomationRoute />
        </Route> */}
        {/* <Route path={routes.HOME}>
          <Redirect to='/' />
        </Route> */}
        <Route exact path='/'>
          <Redirect to={routes.TASK_ROUTE} />
        </Route>
        <Route path='*'>
          <Redirect to={routes.TASK_ROUTE} />
        </Route>
      </Switch>
    );
  }, [user, isAdmin]);

  return (
    <ChakraProvider theme={customTheme}>
      <Router ref={navigationRef}>
        <PageLayout>
          <Fragment>
            <Header user={user} />
            <Box textAlign='center' fontSize='xl'>
              <Grid height='90vh' p={3}>
                {mainApp}
              </Grid>
            </Box>
          </Fragment>
        </PageLayout>
      </Router>
    </ChakraProvider>
  );
};
