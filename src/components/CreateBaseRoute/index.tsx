import * as React from "react"
import {
  Stack,
  Box,
  Text,
  Flex,
  Center,
  Image,
  HStack,
  VStack
} from "@chakra-ui/react"
import { IBaseRoute } from "../../models/baseRoute"
import { _baseRoute } from "../../store/selectors/BaseRoute"
import { useSelector } from "react-redux"
import { _selectedRouteId } from "../../store/selectors/App"
import { useMemo } from "react"
import { ICollectionPoint } from "../../models/collectionPoint"

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

  const content = (
    collectionPoints?.map((collection_point: ICollectionPoint) => (
      <Box p={1} fontSize='0.8rem' borderWidth="1px" key={collection_point.id} >
        <HStack align="flex-start">
          <Image
            minHeight="90px"
            minWidth="90px"
            height="90px"
            width="90px"
            src={collection_point.image}
            alt="image"
            objectFit="contain"
            fontSize='10px'
            backgroundColor='gray.100'
          />
          <VStack align='stretch' p={1} paddingX={0} >
            <HStack>
              <Text >{collection_point.sequence}</Text>
              <Text >{collection_point.name} </Text>
            </HStack>
            <Text textAlign='left' >{collection_point.memo}</Text>
          </VStack>
        </HStack>
      </Box>
    ))
  )

  return (
    <Box minWidth='1000px' height='inherit' >
      <Flex backgroundColor='white' height='inherit' >
        <Box flex="1" minWidth='300px' overflowY='scroll'>
          <Stack >
            {content}
          </Stack>
        </Box>
        <Center flex="4"  >
          <Text>Map</Text>
        </Center>
      </Flex>
    </Box >
  )
}
