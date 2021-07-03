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
import { _selectedRouteId, _user } from "./store/selectors/App"
import { IUser } from "./models/user"
import { checkLogin } from "./store/thunks/App"
import { BaseRouteList } from "./components/BaseRouteList"
import { CreateBaseRoute } from "./components/CreateBaseRoute"
import { dispatchSelectRoute } from "./store/dispatcher"
import { useMemo } from "react"
import { _baseRoute } from "./store/selectors/BaseRoute"
import { IBaseRoute } from "./models/baseRoute"

export const App = () => {
  const customTheme = extendTheme(
    withDefaultColorScheme({
      colorScheme: 'blue'
    }))

  const user: IUser = useSelector(_user)
  const selectedRouteId: number = useSelector(_selectedRouteId)
  const baseRoutesData: any = useSelector(_baseRoute)

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

  const breadcrumbs = (
    user &&
    <Breadcrumb width='max-content' padding={6} paddingY={2} fontWeight="medium" fontSize="sm" >
      <BreadcrumbItem>
        <BreadcrumbLink href="#" onClick={showBaseRouteList} >Route List</BreadcrumbLink>
      </BreadcrumbItem>
      {selectedRouteId && (
        <BreadcrumbItem >
          <BreadcrumbLink href="#">{route?.name}</BreadcrumbLink>
        </BreadcrumbItem>
      )}
    </Breadcrumb>
  )

  return (
    <ChakraProvider theme={customTheme}>
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
