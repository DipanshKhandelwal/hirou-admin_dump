import * as React from "react"
import {
  Box,
  Text,
  Image,
  HStack,
  VStack,
  Button
} from "@chakra-ui/react"
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd"
import { ICollectionPoint } from "../../../models/collectionPoint"

interface CollectionPointListItemProps {
  collectionPoint: ICollectionPoint
  index: number
  onEdit: (collectionPoint: ICollectionPoint) => void
  onDelete: (collectionPoint: ICollectionPoint) => void
}

export const CollectionPointListItem = (props: CollectionPointListItemProps) => {
  const { collectionPoint, index, onEdit, onDelete } = props

  const onEditClick = () => onEdit(collectionPoint)
  const onDeleteClick = () => onDelete(collectionPoint)

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
          <HStack align="flex-start" >
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
            <VStack align='stretch' p={1} paddingX={0} flex={1} >
              <HStack>
                <Text >{collectionPoint.sequence}</Text>
                <Text >{collectionPoint.name} </Text>
              </HStack>
              <Text textAlign='left' >{collectionPoint.memo}</Text>
            </VStack>

            <VStack p={1} >
              <Button colorScheme="blue" size='xs' onClick={onEditClick} >
                <MdEdit />
              </Button>
              <Button colorScheme="red" size='xs' onClick={onDeleteClick} >
                <MdDeleteForever />
              </Button>
            </VStack>
          </HStack>
        </Box>
      )}
    </Draggable>
  )
}
