import * as React from "react"
import {
  Box,
  Text,
  Image,
  HStack,
  VStack
} from "@chakra-ui/react"
import { ICollectionPoint } from "../../../models/collectionPoint"
import { Draggable } from "react-beautiful-dnd"

interface CollectionPointListItemProps {
  collectionPoint: ICollectionPoint
  index: number
}

export const CollectionPointListItem = (props: CollectionPointListItemProps) => {
  const { collectionPoint, index } = props
  return (
    <Draggable
      key={collectionPoint.id}
      draggableId={String(collectionPoint.id)}
      index={index}
    >
      {(provided, snapshot) => (
        <Box p={1}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          fontSize='0.8rem'
          borderWidth="1px"
          userSelect='none'
          backgroundColor={snapshot.isDragging ? 'gray.200' : 'white'}
          style={provided.draggableProps.style}
        >
          <HStack align="flex-start">
            <Image
              minHeight="90px"
              minWidth="90px"
              height="90px"
              width="90px"
              src={collectionPoint.image}
              alt="image"
              objectFit="contain"
              fontSize='10px'
              backgroundColor='gray.100'
            />
            <VStack align='stretch' p={1} paddingX={0} >
              <HStack>
                <Text >{collectionPoint.sequence}</Text>
                <Text >{collectionPoint.name} </Text>
              </HStack>
              <Text textAlign='left' >{collectionPoint.memo}</Text>
            </VStack>
          </HStack>
        </Box>
      )}
    </Draggable>
  )
}
