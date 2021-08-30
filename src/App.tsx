import React, { useEffect } from "react"
import {
  ChakraProvider,
  Box,
  Grid,
  extendTheme,
  withDefaultColorScheme,
  HStack,
  Container,
  Center,
  Heading,
  VStack,
} from "@chakra-ui/react"
import Header from "./components/common/Header"
import Login from "./components/auth/Login"
import { useSelector } from "react-redux"
import { _user } from "./store/selectors/App"
import { IUser } from "./models/user"
import { checkLogin } from "./store/thunks/App"
import { FaRoute } from "react-icons/fa";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import BaseRoute from "./apps/baseRoute"
import TaskRoute from "./apps/taskRoute"
import { navigationRef } from "./services/navigation"

export const App = () => {
  const customTheme = extendTheme(
    withDefaultColorScheme({
      colorScheme: 'blue'
    }))

  const user: IUser = useSelector(_user)

  useEffect(() => {
    checkLogin()
  }, [])

  const showBaseRouteList = () => dispatchSelectRoute(undefined)

  const route: IBaseRoute = useMemo(() => {
    const baseRoute = baseRoutesData.data.find((baseRoute: IBaseRoute) => baseRoute.id === selectedRouteId)
    return baseRoute
  }, [baseRoutesData, selectedRouteId])

  let content = <Login />
  if (user && selectedRouteId) {
    content = <CreateBaseRoute />;
  }
  else if (user) {
    content = <BaseRouteList />;
  }

  const mainApp = (
    <Switch>
      <Route path="/base-routes">
        <BaseRoute />
      </Route>
      <Route path="/task-routes">
        <TaskRoute />
      </Route>
      <Route path="/reports">
        <div>reports</div>
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/home">
        {home}
      </Route>
      <Route path="/">
        {home}
      </Route>
    </Switch>
  )

  return (
    <ChakraProvider theme={customTheme}>
      <Router ref={navigationRef} >
        <Header user={user} />
        <Box textAlign="center" fontSize="xl">
          <Grid height="84vh" p={3}>
            {mainApp}
          </Grid>
        </Box>
      </Router>
      <Header user={user} />
      <Box textAlign="center" fontSize="xl">
        {breadcrumbs}
        <Grid height="84vh" p={3}>
          {content}
        </Grid>
      </Box>
    </ChakraProvider>
  )
}
