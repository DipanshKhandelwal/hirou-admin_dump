import React from 'react';
import { HStack, Container, Center, Heading, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaRoute } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { _isAdmin } from '../../store/selectors/App';
import routes from '../../constants/routes';

const HOME_OPTIONS = [
  {
    to: routes.BASE_ROUTE,
    name: 'Base Route',
    isAdminScreen: true,
  },
  {
    to: routes.TASK_ROUTE,
    name: 'Task Route',
    isAdminScreen: false,
  },
];

function Home() {
  const isAdmin: boolean = useSelector(_isAdmin);

  return (
    <Center>
      <HStack height='40vh'>
        {HOME_OPTIONS.map((option) => {
          if (option.isAdminScreen && !isAdmin) return null;
          return (
            <Container key={option.to}>
              <Link to={option.to}>
                <VStack
                  padding='8vw'
                  width='40vw'
                  borderRadius={6}
                  border='black 1px solid'
                  _hover={{ fontWeight: 'semibold', border: 'black 3px solid' }}
                >
                  <FaRoute size={40} />
                  <Heading>{option.name}</Heading>
                </VStack>
              </Link>
            </Container>
          );
        })}
      </HStack>
    </Center>
  );
}

export default Home;
