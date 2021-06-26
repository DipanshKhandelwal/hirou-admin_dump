import * as React from "react"
import {
  ChakraProvider,
  Box,
  Grid,
  extendTheme,
  withDefaultColorScheme,
  Button
} from "@chakra-ui/react"
import Header from "./components/common/Header"
import Login from "./components/auth/Login"
import { dispatchIncreaseCounter } from "./store/dispatcher"
import { useSelector } from "react-redux"


export const App = () => {
  const customTheme = extendTheme(withDefaultColorScheme({
    colorScheme: 'blue'
  }))

  const counter = useSelector(state => state.app.count)

  const click = () => {
    dispatchIncreaseCounter()
  }

  return (
    <ChakraProvider theme={customTheme}>
      <Header />
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <Login />
          {counter}
          <Button onClick={click}>Login</Button>
        </Grid>
      </Box>
    </ChakraProvider>
  )
}
