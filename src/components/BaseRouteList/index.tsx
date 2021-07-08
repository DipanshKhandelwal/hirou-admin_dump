import * as React from "react"
import {
  Container,
  Heading,
  Table, Thead, Tbody, Tr, Th, Td,
  Spinner,
} from "@chakra-ui/react"
import { useEffect } from "react"
import { handleFetchBaseRoute } from "../../store/thunks/BaseRoute"
import { IBaseRoute } from "../../models/baseRoute"
import { _baseRoute } from "../../store/selectors/BaseRoute"
import { useSelector } from "react-redux"
import { dispatchSelectRoute } from "../../store/dispatcher"
import { IGarbage } from "../../models/garbage"

export const BaseRouteList = () => {
  const baseRoutesData: any = useSelector(_baseRoute)

  useEffect(() => {
    handleFetchBaseRoute()
  }, [])

  const selectBaseRoute = (baseRouteId: number) => {
    dispatchSelectRoute(baseRouteId)
  }

  let content = <Spinner />
  if (baseRoutesData.isLoaded) {
    content = (
      <Table size="sm" variant='simple' >
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>name</Th>
            <Th>garbage</Th>
            <Th>customer</Th>
          </Tr>
        </Thead>
        <Tbody >
          {baseRoutesData?.data?.map((baseRoute: IBaseRoute, idx: number) => (
            <Tr
              key={baseRoute.id}
              _hover={{ backgroundColor: 'blue.100', cursor: 'pointer' }}
              onClick={() => selectBaseRoute(baseRoute.id)}
            >
              <Td>{idx + 1}</Td>
              <Td>{baseRoute.name}</Td>
              <Td>
                {baseRoute.garbage.map((_garbage: IGarbage) => _garbage.name).join(', ')}
              </Td>
              <Td>{baseRoute.customer?.name ?? '--'}</Td>
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
