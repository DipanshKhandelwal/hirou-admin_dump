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
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { useState } from "react"
import { CreateBaseRouteModal } from "./components/CreateBaseRouteModal"
import { BaseRouteDeleteConfirmationModal } from "./components/BaseRouteDeleteConfirmationModal"
import { deleteBaseRoute } from "../../services/apiRequests/baseRoute"

export const BaseRouteList = () => {
  const baseRoutesData: any = useSelector(_baseRoute)
  const [isCreateRouteModalOpen, setCreateRouteModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedRoute, setSelectedRoute] = useState<IBaseRoute | null>(null)
  const cancelRef = React.useRef()
  const toast = useToast()

  useEffect(() => {
    handleFetchBaseRoute()
  }, [])

  const selectBaseRoute = (baseRouteId: number) => dispatchSelectRoute(baseRouteId)

  const getRouteFromId = (baseRouteId: number) => baseRoutesData.data.find((baseRoute: IBaseRoute) => baseRoute.id === baseRouteId)

  const onDeleteIconClicked = (baseRouteId: number) => {
    const _baseRoute = getRouteFromId(baseRouteId)
    if (_baseRoute) {
      setSelectedRoute(_baseRoute)
      setIsDeleteModalOpen(true)
    }
  }

  const onDelete = async () => {
    if (selectedRoute !== null) {
      try {
        await deleteBaseRoute(selectedRoute.id)
        handleFetchBaseRoute()
        toast({
          title: "Base route deleted",
          description: "",
        })
      }
      catch {
        toast({
          title: "Error deleting base route",
          description: "please try again",
          status: "error",
        })
      }
    }
    onDeleteModalClose()
  }

  const onDeleteModalClose = () => {
    setSelectedRoute(null)
    setIsDeleteModalOpen(false)
  }

  const onEditIconClicked = (baseRouteId: number) => {
    const _baseRoute = getRouteFromId(baseRouteId)
    if (_baseRoute) {
      setSelectedRoute(_baseRoute)
      setCreateRouteModalOpen(true)
    }
  }

  const onEditModalClose = () => {
    setSelectedRoute(null)
    setCreateRouteModalOpen(false)
  }

  let content = <Spinner />
  if (baseRoutesData.isLoaded) {
    content = (
      <Table size="sm" variant='simple' >
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>ルート名</Th>
            <Th>品目</Th>
            <Th>顧客</Th>
            <Th>操作</Th>
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
                <HStack>
                  <Button colorScheme="blue" onClick={(e: any) => {
                    e.stopPropagation()
                    onEditIconClicked(baseRoute.id)
                  }} >
                    <MdEdit />
                  </Button>

                  <Button colorScheme="red" onClick={(e: any) => {
                    e.stopPropagation()
                    onDeleteIconClicked(baseRoute.id)
                  }} >
                    <MdDeleteForever />
                  </Button>
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    )
  }

  const onOpen = () => {
    setSelectedRoute(null)
    setCreateRouteModalOpen(true)
  }

  return (
    <Container maxW="container.xl">
      <HStack marginBottom={5} justifyContent='space-between' >
        <Heading textAlign='start' >ルート一覧</Heading>
        <Button onClick={onOpen} >新規作成</Button>
        <CreateBaseRouteModal baseRoute={selectedRoute} isOpen={isCreateRouteModalOpen} onClose={onEditModalClose} />
      </HStack>
      {content}
      <BaseRouteDeleteConfirmationModal onAccept={onDelete} cancelRef={cancelRef} onCancel={onDeleteModalClose} isOpen={isDeleteModalOpen} />
    </Container>
  )
}
