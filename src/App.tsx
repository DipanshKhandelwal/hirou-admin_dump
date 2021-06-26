import * as React from "react"
import {
  ChakraProvider,
  Box,
  Grid,
  extendTheme,
  withDefaultColorScheme,
} from "@chakra-ui/react"
import Header from "./components/common/Header"
import Login from "./components/auth/Login"

export const App = () => {
  const customTheme = extendTheme(
    withDefaultColorScheme({
      colorScheme: 'blue'
    }))

  return (
    <ChakraProvider theme={customTheme}>
      <Header />
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <Login />
        </Grid>
      </Box>
    </ChakraProvider>
  )
}
