import * as React from "react"
import {
  Box,
  Text,
  Image,
  HStack,
  VStack,
  Button
} from "@chakra-ui/react"
import { MdEdit } from "react-icons/md";
import { ITaskCollectionPoint } from "../../../models/taskCollectionPoint";

interface TaskCollectionPointListItemProps {
  taskCollectionPoint: ITaskCollectionPoint
  onComplete: (taskCollectionPoint: ITaskCollectionPoint) => void
}

export const TaskCollectionPointListItem = (props: TaskCollectionPointListItemProps) => {
  const { taskCollectionPoint: collectionPoint, onComplete } = props

  const onEditClick = () => onComplete(collectionPoint)

  const toggleCollection = (taskCollectionId: number) => { }

  return (
    <Box key={collectionPoint.id} p={1}
      fontSize='0.8rem'
      borderWidth="1px"
      userSelect='none'
      backgroundColor='white'
      my={2}
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
        </VStack>
      </HStack>
      <div >
        {collectionPoint.task_collection.map((taskCollection) => (
          <Button onClick={() => toggleCollection(taskCollection.id)} m={0.5} fontSize={10} h={8} p={0} variant={taskCollection.complete ? 'solid' : 'outline'} >{taskCollection.garbage.name}</Button>
        ))}
      </div>
    </Box>
  )
}
