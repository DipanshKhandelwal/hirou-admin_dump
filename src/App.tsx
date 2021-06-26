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

export const App = () => {
  const customTheme = extendTheme(
    withDefaultColorScheme({
      colorScheme: 'blue'
    }))

  const user: IUser = useSelector(_user)

  useEffect(() => {
    checkLogin()
  }, [])

  let content = <Login />
  if (user) {
    content = <div>App</div>;
  }

  return (
    <ChakraProvider theme={customTheme}>
      <Header user={user} />
      <Box textAlign="center" fontSize="xl">
        <Grid height="92vh" p={3}>
          {content}
        </Grid>
      </Box>
    </ChakraProvider>
  )
}
