import * as React from "react"
import {
  Stack,
  Box,
  Flex,
  Center,
  useToast,
} from "@chakra-ui/react"
import { IBaseRoute } from "../../models/baseRoute"
import { _baseRoute } from "../../store/selectors/BaseRoute"
import { useSelector } from "react-redux"
import { _selectedRouteId } from "../../store/selectors/App"
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

export const CreateBaseRoute = () => {
  const [isSeqUpdateModalOpen, setIsSeqUpdateModalOpen] = useState(false)
  const [localCollectionPoints, setLocalCollectionPoints] = useState<ICollectionPoint[]>([])
  const cancelRef = React.useRef()
  const toast = useToast()

  const baseRoutesData: any = useSelector(_baseRoute)
  const selectedRouteId: number = useSelector(_selectedRouteId)

  const route: IBaseRoute = useMemo(() => {
    const baseRoute = baseRoutesData.data.find((baseRoute: IBaseRoute) => baseRoute.id === selectedRouteId)
    return baseRoute
  }, [baseRoutesData, selectedRouteId])

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

  const collectionPointsList = localCollectionPoints?.map((collectionPoint: ICollectionPoint, index: number) => (
    <CollectionPointListItem key={collectionPoint.id} collectionPoint={collectionPoint} index={index} />
  ))

  return (
    <Box minWidth='1000px' height='inherit' >
      <Flex backgroundColor='white' height='inherit' >
        <Box flex="1" minWidth='300px' overflowY='scroll'>
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
          <RouteMap baseRoute={route} />
        </Center>
      </Flex>
      <UpdateConfirmationModal onAccept={onSeqUpdate} cancelRef={cancelRef} onCancel={onSeqUpdateModalClose} isOpen={isSeqUpdateModalOpen} />
    </Box >
  )
}
