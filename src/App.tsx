import React, { useEffect } from "react"
import {
  ChakraProvider,
  Box,
  Grid,
  extendTheme,
  withDefaultColorScheme,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink
} from "@chakra-ui/react"
import Header from "./components/common/Header"
import Login from "./components/auth/Login"
import { useSelector } from "react-redux"
import { _user } from "./store/selectors/App"
import { IUser } from "./models/user"
import { checkLogin } from "./store/thunks/App"
import { BaseRouteList } from "./components/BaseRouteList"

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
    content = <BaseRouteList />;
  }

  const breadcrumbs = (
    <Breadcrumb width='max-content' padding={6} fontWeight="medium" fontSize="sm" >
      <BreadcrumbItem>
        <BreadcrumbLink href="#" >Route List</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem >
        <BreadcrumbLink href="#">Selected Route</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  )

  return (
    <ChakraProvider theme={customTheme}>
      <Header user={user} />
      <Box textAlign="center" fontSize="xl">
        {breadcrumbs}
        <Grid height="92vh" p={3}>
          {content}
        </Grid>
      </Box>
    </ChakraProvider>
  )
}
