import * as React from "react"
import {
  Container,
  Heading,
  Table, Thead, Tbody, Tr, Th, Td,
  Spinner,
} from "@chakra-ui/react"
import { IBaseRoute } from "../../models/baseRoute"
import { _baseRoute } from "../../store/selectors/BaseRoute"
import { useSelector } from "react-redux"

export const BaseRouteList = () => {
  const baseRoutesData: any = useSelector(_baseRoute)

  let content = <Spinner />
  if (baseRoutesData.isLoaded) {
    content = (
      <Table size="sm" variant='simple' >
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Customer</Th>
            <Th isNumeric>name</Th>
          </Tr>
        </Thead>
        <Tbody>
          {baseRoutesData?.data?.map((baseRoute: IBaseRoute) => (
            <Tr key={baseRoute.id} >
              <Td>{baseRoute.id}</Td>
              <Td>{baseRoute.customer?.name ?? '--'}</Td>
              <Td isNumeric>{baseRoute.name}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    )
  }

  return (
    <Container maxW="container.xl">
      <Heading textAlign='start' marginBottom={5} >Base Route List</Heading>
      {content}
    </Container>
  )
}
