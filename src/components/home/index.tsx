import React from 'react'
import {
  HStack,
  Container,
  Center,
  Heading,
  VStack,
} from "@chakra-ui/react"
import { Link } from "react-router-dom";
import { FaRoute } from "react-icons/fa";

function Home() {
  return (
    <Center>
      <HStack height='40vh'  >
        <Container>
          <Link to='/base-routes'>
            <VStack padding='8vw' width='40vw' border='black 1px solid'
              _hover={{ fontWeight: 'semibold', border: 'black 3px solid' }} >
              <FaRoute size={40} />
              <Heading >Base Route</Heading>
            </VStack>
          </Link>
        </Container>
        <Container>
          <Link to='/task-routes'>
            <VStack padding='8vw' width='40vw' border='black 1px solid'
              _hover={{ fontWeight: 'semibold', border: 'black 3px solid' }}>
              <FaRoute size={40} />
              <Heading >Task Route</Heading>
            </VStack>
          </Link>
        </Container>
      </HStack>
    </Center>
  )
}

export default Home;