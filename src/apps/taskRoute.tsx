import React from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
  Redirect,
} from 'react-router-dom';
import { TaskRouteList } from '../components/TaskRouteList';
import { TaskRouteDetail } from '../components/TaskRouteDetail';

function TaskRoute() {
  let match = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route path={`${match.path}/list`}>
          <TaskRouteList />
        </Route>
        <Route path={`${match.path}/:taskRouteId`}>
          <TaskRouteDetail />
        </Route>
        <Route path={match.path}>
          <Redirect to={`${match.path}/list`} />
        </Route>
      </Switch>
    </div>
  );
}

export default TaskRoute;