import * as React from "react"
import {
  Box,
  Flex,
  Center,
  Text,
  useToast,
} from "@chakra-ui/react"

import { getTaskRoute } from '../../services/apiRequests/taskRoute'

import { useState, useCallback } from "react"
import { TaskCollectionPointListItem } from "./components/TaskCollectionPointListItem"
import { useEffect } from "react"
import TaskRouteMap from "./components/TaskRouteMap"
import { useParams } from "react-router-dom"
import { navigate } from "../../services/navigation"
import { ITaskRoute } from "../../models/taskRoute"
import { ITaskCollectionPoint } from "../../models/taskCollectionPoint"
import { TASK_COLLECTION_POINT_URL, TASK_COLLECTION_URL } from "../../constants/urls"
import { ITaskCollection } from "../../models/taskCollection"
import { hirouAxios } from "../../services/httpInstance"

// TODO: Connect socket
export const CreateTaskRoute = () => {
  const [localCollectionPoints, setLocalCollectionPoints] = useState<ITaskCollectionPoint[]>([])
  const toast = useToast()

  const [route, setRoute] = useState<ITaskRoute | null>(null)

  let { taskRouteId }: { taskRouteId: string } = useParams();
  const selectedRouteId = Number(taskRouteId)

  const init = useCallback(async () => {
    // try fetching the task route else redirect to list
    try {
      const data = await getTaskRoute(selectedRouteId);
      setRoute(data)
    }
    catch (e) {
      toast({
        title: "Incorrct route",
        description: "please select an existing route",
        status: "error",
      })
      navigate('/list')
    }
  }, [selectedRouteId, toast])

  useEffect(() => {
    init()
  }, [init])

  useEffect(() => {
    const cps = route?.task_collection_point.sort((a: ITaskCollectionPoint, b: ITaskCollectionPoint) => {
      return a.sequence - b.sequence
    })
    setLocalCollectionPoints(cps ?? [])
  }, [route])

  const onToggleTask = async (taskCollection: ITaskCollection) => {
    try {
      const url = `${TASK_COLLECTION_URL}${taskCollection.id}/`
      await hirouAxios.put(url, { complete: !taskCollection.complete });
      init(); // TODO : Remove after socket setup
    } catch (e) {
      toast({
        title: "Error updating collection",
        description: "please try again",
        status: "error",
      })
    }
  }

  const collectionPointsList = localCollectionPoints?.map((taskCollectionPoint: ITaskCollectionPoint, index: number) => {
    const onToggleAllTasks = async () => {
      try {
        const url = `${TASK_COLLECTION_POINT_URL}${taskCollectionPoint.id}/bulk_complete/`
        await hirouAxios.post(url, {});
        init(); // TODO : Remove after socket setup
      } catch (e) {
        toast({
          title: "Error updating collection",
          description: "please try again",
          status: "error",
        })
      }
    }

    return <TaskCollectionPointListItem
      toggleAllTasks={onToggleAllTasks}
      toggleTask={onToggleTask}
      key={taskCollectionPoint.id}
      taskCollectionPoint={taskCollectionPoint}
    />
  })

  return (
    <Flex backgroundColor='white' height='inherit' >
      <Box flex="1" minWidth='300px' overflowY='scroll'>
        {localCollectionPoints.length === 0 && <Text>No Collection Points</Text>}
        {collectionPointsList}
      </Box>
      <Center flex="4"  >
        <TaskRouteMap baseRoute={route} />
      </Center>
    </Flex>
  )
}
