import React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import { TaskRouteList } from '../components/TaskRouteList';
import { TaskRouteDetail } from '../components/TaskRouteDetail';
import { CreateTaskRoute } from '../components/CreateTaskRoute';

function TaskRoute() {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}/list`}>
        <TaskRouteList />
      </Route>
      <Route path={`${match.path}/map/:taskRouteId`}>
        <CreateTaskRoute />
      </Route>
      <Route path={`${match.path}/:taskRouteId`}>
        <TaskRouteDetail />
      </Route>
      <Route path={match.path}>
        <Redirect to={`${match.path}/list`} />
      </Route>
    </Switch>
  );
}

export default TaskRoute;
