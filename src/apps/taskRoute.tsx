import React from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
  Redirect,
} from 'react-router-dom';
import { TaskRouteList } from '../components/TaskRouteList';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react"
import { TaskRouteDetail } from '../components/TaskRouteDetail';

function TaskRoute() {
  let match = useRouteMatch();

  const breadcrumbs = (
    <Breadcrumb width='max-content' padding={6} paddingY={2} fontWeight="medium" fontSize="sm" >
      <BreadcrumbItem>
        <BreadcrumbLink href='/base-routes' >Task</BreadcrumbLink>
      </BreadcrumbItem>
      {/* {selectedRouteId && (
        <BreadcrumbItem >
          <BreadcrumbLink href="#">{route?.name}</BreadcrumbLink>
        </BreadcrumbItem>
      )} */}
    </Breadcrumb>
  )

  return (
    <div>
      {breadcrumbs}
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