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
    if (!user) return <Login />

    return (
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
          <Grid height="84vh" p={3}>
            {mainApp}
          </Grid>
        </Box>
      </Router>
    </ChakraProvider>
  )
}
