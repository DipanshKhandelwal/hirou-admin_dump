import React, { useEffect } from "react"
import {
  ChakraProvider,
  Box,
  Grid,
  extendTheme,
  withDefaultColorScheme,
} from "@chakra-ui/react"
import Header from "./components/common/Header"
import Login from "./components/auth/Login"
import { useSelector } from "react-redux"
import { _user } from "./store/selectors/App"
import { IUser } from "./models/user"
import { checkLogin } from "./store/thunks/App"
import Home from './components/home'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import BaseRoute from "./apps/baseRoute"
import TaskRoute from "./apps/taskRoute"
import { navigationRef } from "./services/navigation"
import { useMemo } from "react"
import PrivacyPolicy from "./apps/privacyPolicy"
import routes from "./constants/routes"

export const App = () => {
  const customTheme = extendTheme(
    withDefaultColorScheme({
      colorScheme: 'blue'
    }))

  const user: IUser = useSelector(_user)

  useEffect(() => {
    checkLogin()
  }, [])

  const mainApp = useMemo(() => {
    if (!user) return <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/privacy-policy">
        <PrivacyPolicy />
      </Route>
      <Route path="*" >
        <Redirect to='/login' />
      </Route>
    </Switch>

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
        <Route path={routes.HOME}>
          <Redirect to='/' />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="*" >
          <Redirect to='/' />
        </Route>
      </Switch>
    )
  }, [user])

  return (
    <ChakraProvider theme={customTheme}>
      <Router ref={navigationRef} >
        <Header user={user} />
        <Box textAlign="center" fontSize="xl">
          <Grid height="90vh" p={3}>
            {mainApp}
          </Grid>
        </Box>
      </Router>
    </ChakraProvider>
  )
}
