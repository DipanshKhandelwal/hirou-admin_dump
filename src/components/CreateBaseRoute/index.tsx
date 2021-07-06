import * as React from "react"
import {
  Stack,
  Box,
  Text,
  Flex,
  Center,
} from "@chakra-ui/react"
import { IBaseRoute } from "../../models/baseRoute"
import { _baseRoute } from "../../store/selectors/BaseRoute"
import { useSelector } from "react-redux"
import { _selectedRouteId } from "../../store/selectors/App"
import { useMemo } from "react"
import { ICollectionPoint } from "../../models/collectionPoint"
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import { CollectionPointListItem } from "./components/CollectionPointListItem"

export const CreateBaseRoute = () => {
  const baseRoutesData: any = useSelector(_baseRoute)
  const selectedRouteId: number = useSelector(_selectedRouteId)

  const route: IBaseRoute = useMemo(() => {
    const baseRoute = baseRoutesData.data.find((baseRoute: IBaseRoute) => baseRoute.id === selectedRouteId)
    return baseRoute
  }, [baseRoutesData, selectedRouteId])

  const collectionPoints = useMemo(() => {
    return route?.collection_point.sort((a: ICollectionPoint, b: ICollectionPoint) => {
      return a.sequence - b.sequence
    })
  }, [route])

  const onDragEnd = (e: any) => console.log("onDragEnd", e)

  const collectionPointsList = (
    collectionPoints?.map((collectionPoint: ICollectionPoint, index: number) => (
      <CollectionPointListItem collectionPoint={collectionPoint} index={index} />
    ))
  )

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
          <Text>Map</Text>
        </Center>
      </Flex>
    </Box >
  )
}
