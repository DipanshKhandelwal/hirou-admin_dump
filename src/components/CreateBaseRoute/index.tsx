import * as React from "react"
import {
  Stack,
  Box,
  Flex,
  Center,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react"
import { IBaseRoute } from "../../models/baseRoute"
import { _baseRoute } from "../../store/selectors/BaseRoute"
import { useSelector } from "react-redux"
import { useMemo, useState } from "react"
import { ICollectionPoint } from "../../models/collectionPoint"
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import { CollectionPointListItem } from "./components/CollectionPointListItem"
import { UpdateConfirmationModal } from "./components/UpdateConfirmationModal"
import { useEffect } from "react"
import { hirouAxios } from "../../services/httpInstance"
import { BASE_ROUTE_URL } from "../../constants/urls"
import { dispatchUpdateBaseRoute } from "../../store/dispatcher/BaseRoute"
import RouteMap from "./components/RouteMap"
import { AddCollectionPointModal } from "./components/AddCollectionPointModal"
import { CollectionPointDeleteConfirmationModal } from "./components/CollectionPointDeleteConfirmationModal"
import { deleteCollectionPoint, editCollectionPoint } from "../../services/apiRequests/collectionPoint"
import { handleFetchUpdatedBaseRoute } from "../../store/thunks/BaseRoute"
import { useParams } from "react-router-dom"
import { navigate } from "../../services/navigation"

export const CreateBaseRoute = () => {
  const [isSeqUpdateModalOpen, setIsSeqUpdateModalOpen] = useState(false)
  const [localCollectionPoints, setLocalCollectionPoints] = useState<ICollectionPoint[]>([])
  const cancelRef = React.useRef()
  const toast = useToast()

  const [selectedCollectionPoint, setSelectedCollectionPoint] = useState<ICollectionPoint | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isAddCPModalOpen, setAddCPModalOpen] = useState(false)

  const [tempMarker, setTempMarker] = useState<any>(null)

  const baseRoutesData: any = useSelector(_baseRoute)

  let { baseRouteId }: { baseRouteId: string } = useParams();
  const selectedRouteId = Number(baseRouteId)

  const route: IBaseRoute = useMemo(() => {
    const baseRoute = baseRoutesData.data.find((baseRoute: IBaseRoute) => baseRoute.id === selectedRouteId)
    return baseRoute
  }, [baseRoutesData, selectedRouteId])

  useEffect(() => {
    async function init() {
      // try fetching the route else redirect to list
      try { await handleFetchUpdatedBaseRoute(selectedRouteId) }
      catch (e) {
        toast({
          title: "Incorrct route",
          description: "please select an existing route",
          status: "error",
        })
        navigate('/list')
      }
    }

    init()
  }, [selectedRouteId, toast])

  useEffect(() => {
    const cps = route?.collection_point.sort((a: ICollectionPoint, b: ICollectionPoint) => {
      return a.sequence - b.sequence
    })
    setLocalCollectionPoints(cps)
  }, [route])

  const reorder = (list: ICollectionPoint[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (e: any) => {
    if (!e.destination) return
    if (e.destination.index === e.source.index) return
    const items = reorder(
      localCollectionPoints,
      e.source.index,
      e.destination.index
    );
    setLocalCollectionPoints(items)
    setIsSeqUpdateModalOpen(true)
  }

  const onSeqUpdateModalClose = () => {
    const cps = route?.collection_point.sort((a: ICollectionPoint, b: ICollectionPoint) => {
      return a.sequence - b.sequence
    })
    setLocalCollectionPoints(cps)
    setIsSeqUpdateModalOpen(false)
  }

  const onSeqUpdate = async () => {
    try {
      const list = localCollectionPoints.map(cp => cp.id)
      const url = `${BASE_ROUTE_URL}${route.id}/reorder_points/`
      const data = { points: list }
      const response = await hirouAxios.post(url, data);
      const _data = response.data;
      dispatchUpdateBaseRoute(_data)
    } catch (e) {
      toast({
        title: "Error updating sequence",
        description: "please try again",
        status: "error",
      })
    }
    setIsSeqUpdateModalOpen(false)
  }

  const handleEditClicked = (cp: ICollectionPoint) => {
    const _cp = getCPFromId(cp.id)
    if (_cp) {
      setSelectedCollectionPoint(_cp)
      setAddCPModalOpen(true)
    }
  }

  const onEditModalClose = () => {
    setSelectedCollectionPoint(null)
    setAddCPModalOpen(false)
    setTempMarker(null)
  }

  const getCPFromId = (cpId: number) => route.collection_point.find((cp: ICollectionPoint) => cp.id === cpId)

  const handleDeleteClicked = (cp: ICollectionPoint) => {
    const _cp = getCPFromId(cp.id)
    if (_cp) {
      setSelectedCollectionPoint(_cp)
      setIsDeleteModalOpen(true)
    }
  }

  const onDelete = async () => {
    if (selectedCollectionPoint !== null) {
      try {
        await deleteCollectionPoint(selectedCollectionPoint.id)
        handleFetchUpdatedBaseRoute(selectedRouteId)
        toast({
          title: "Collection point deleted",
          description: "",
        })
      }
      catch {
        toast({
          title: "Error deleting collection point",
          description: "please try again",
          status: "error",
        })
      }
    }
    onDeleteModalClose()
  }

  const onDeleteModalClose = () => {
    setSelectedCollectionPoint(null)
    setIsDeleteModalOpen(false)
  }

  const collectionPointsList = localCollectionPoints?.map((collectionPoint: ICollectionPoint, index: number) => (
    <CollectionPointListItem
      onEdit={handleEditClicked}
      onDelete={handleDeleteClicked}
      key={collectionPoint.id}
      collectionPoint={collectionPoint} index={index}
    />
  ))

  const updateCollectionPointCoordinates = async (cp: ICollectionPoint, newCoordinates: any) => {
    try {
      const _cp = getCPFromId(cp.id)
      if (_cp) {
        const { longitude, latitude } = newCoordinates;
        const newLocation = `${latitude},${longitude}`
        await editCollectionPoint(_cp.id, {
          name: _cp.name,
          address: _cp.address,
          memo: _cp.memo,
          location: newLocation
        })
        handleFetchUpdatedBaseRoute(selectedRouteId)
        toast({
          title: "Updated collection point",
          description: "",
          status: "success",
        })
      }
    }
    catch (e) {
      toast({
        title: "Error",
        description: "please check the credentials",
        status: "error",
      })
    }
  }

  return (
    <Flex backgroundColor='white' height='inherit' >
      <Box flex="1" minWidth='300px' overflowY='scroll'>
        {localCollectionPoints.length === 0 && <Text>No Collection Points</Text>}
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <Stack
                ref={provided.innerRef}
                backgroundColor={snapshot.isDraggingOver ? '#dbdbdb' : 'white'}
                {...provided.droppableProps}
              >
                {collectionPointsList}
              </Stack>
            )}
          </Droppable>
        </DragDropContext>
      </Box>
      <Center flex="4"  >
        <RouteMap
          tempMarker={tempMarker}
          setTempMarker={setTempMarker}
          setAddCPModalOpen={setAddCPModalOpen}
          baseRoute={route}
          updateCollectionPointCoordinates={updateCollectionPointCoordinates}
        />
      </Center>
      <AddCollectionPointModal collectionPoint={selectedCollectionPoint} marker={tempMarker} baseRouteId={route?.id} isOpen={isAddCPModalOpen} onClose={onEditModalClose} />
      <UpdateConfirmationModal onAccept={onSeqUpdate} cancelRef={cancelRef} onCancel={onSeqUpdateModalClose} isOpen={isSeqUpdateModalOpen} />
      <CollectionPointDeleteConfirmationModal onAccept={onDelete} cancelRef={cancelRef} onCancel={onDeleteModalClose} isOpen={isDeleteModalOpen} />
    </Flex>
  )
}
