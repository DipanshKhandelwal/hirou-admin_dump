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
  const [isCreateRouteModalOpen, setCreateRouteModalOpen] = useState(false)
  const [selectedRoute, setSelectedRoute] = useState<number | null>(null)
  const cancelRef = React.useRef()

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
            <Th>option</Th>
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
              <Td>
                <Button colorScheme="red" onClick={(e: any) => {
                  e.stopPropagation()
                  onDeleteIconClicked(baseRoute.id)
                }} >
                  <MdDeleteForever />
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    )
  }

  const onOpen = () => setCreateRouteModalOpen(true)
  const onClose = () => setCreateRouteModalOpen(false)

  return (
    <Container maxW="container.xl">
      <Heading textAlign='start' marginBottom={5} >Base Route List</Heading>
      {content}
      <BaseRouteDeleteConfirmationModal onAccept={onDelete} cancelRef={cancelRef} onCancel={onDeleteModalClose} isOpen={isDeleteModalOpen} />
    </Container>
  )
}
