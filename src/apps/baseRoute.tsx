import React from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
  Redirect,
} from 'react-router-dom';
import { BaseRouteList } from '../components/BaseRouteList';
import { CreateBaseRoute } from '../components/CreateBaseRoute';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,

} from "@chakra-ui/react"

function BaseRoute() {
  let match = useRouteMatch();

  const breadcrumbs = (
    <Breadcrumb width='max-content' padding={6} paddingY={2} fontWeight="medium" fontSize="sm" >
      <BreadcrumbItem>
        <BreadcrumbLink href='/base-routes' >ルート一覧</BreadcrumbLink>
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
          <BaseRouteList />
        </Route>
        <Route path={`${match.path}/:baseRouteId`}>
          <CreateBaseRoute />
        </Route>
        <Route path={match.path}>
          <Redirect to={`${match.path}/list`} />
        </Route>
      </Switch>
    </div>
  );
}

export default BaseRoute;