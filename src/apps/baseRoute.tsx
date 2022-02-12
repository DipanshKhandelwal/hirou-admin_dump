import React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import { BaseRouteList } from '../components/BaseRouteList';
import { CreateBaseRoute } from '../components/CreateBaseRoute';

function BaseRoute() {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}/list`}>
        <BaseRouteList />
      </Route>
      <Route path={`${match.path}/:baseRouteId`}>
        <CreateBaseRoute />
      </Route>
      <Route path={match.path}>
        <Redirect to={`${match.path}/list`} />
      </Route>
    </Switch>
  );
}

export default BaseRoute;
