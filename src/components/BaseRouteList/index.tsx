import * as React from "react"
import {
  Container,
  Heading,
  Table, Thead, Tbody, Tr, Th, Td,
  HStack,
  Spinner,
  Button,
  useToast,
} from "@chakra-ui/react"
import { useEffect } from "react"
import { handleFetchBaseRoute } from "../../store/thunks/BaseRoute"
import { IBaseRoute } from "../../models/baseRoute"
import { _baseRoute } from "../../store/selectors/BaseRoute"
import { useSelector } from "react-redux"
import { dispatchSelectRoute } from "../../store/dispatcher"
import { IGarbage } from "../../models/garbage"
import { IoMdAddCircleOutline } from "react-icons/io"
import { MdDeleteForever } from "react-icons/md";
import { useState } from "react"
import { CreateBaseRouteModal } from "./components/CreateBaseRouteModal"
import { BaseRouteDeleteConfirmationModal } from "./components/BaseRouteDeleteConfirmationModal"
import { deleteBaseRoute, getAllBaseRoute } from "../../services/apiRequests/baseRoute"

export const BaseRouteList = () => {
  const baseRoutesData: any = useSelector(_baseRoute)
  const [isCreateRouteModalOpen, setCreateRouteModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedRoute, setSelectedRoute] = useState<number | null>(null)
  const cancelRef = React.useRef()
  const toast = useToast()

  useEffect(() => {
    handleFetchBaseRoute()
  }, [])

  const selectBaseRoute = (baseRouteId: number) => dispatchSelectRoute(baseRouteId)

  const onDeleteIconClicked = (baseRouteId: number) => {
    setSelectedRoute(baseRouteId)
    setIsDeleteModalOpen(true)
  }

  const onDelete = async () => {
    if (selectedRoute !== null) {
      try {
        await deleteBaseRoute(selectedRoute)
        getAllBaseRoute()

      }
      catch {

      }
    }
    onDeleteModalClose()
  }

  const onDeleteModalClose = () => {
    setSelectedRoute(null)
    setIsDeleteModalOpen(false)
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
      <HStack marginBottom={5}>
        <Heading textAlign='start' >Base Route List</Heading>
        <Button onClick={onOpen} leftIcon={<IoMdAddCircleOutline size={20} style={{ margin: 0 }} />}>
          Add
        </Button>
        <CreateBaseRouteModal isOpen={isCreateRouteModalOpen} onClose={onClose} />
      </HStack>
      {content}
      <BaseRouteDeleteConfirmationModal onAccept={onDelete} cancelRef={cancelRef} onCancel={onDeleteModalClose} isOpen={isDeleteModalOpen} />
    </Container>
  )
}
