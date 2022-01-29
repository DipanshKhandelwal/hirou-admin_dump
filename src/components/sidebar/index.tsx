import * as React from 'react';
import { Flex, Heading, Text, Box, Divider } from '@chakra-ui/react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { _isAdmin } from '../../store/selectors/App';
import routes from '../../constants/routes';

export function Sidebar() {
  const isAdmin: boolean = useSelector(_isAdmin);
  const { pathname } = useLocation();

  if (
    !(
      pathname.includes(routes.TASK_ROUTE) ||
      pathname.includes(routes.BASE_ROUTE)
    ) ||
    pathname.includes(`${routes.TASK_ROUTE}/map`) ||
    (pathname.includes(routes.BASE_ROUTE) &&
      pathname !== `${routes.BASE_ROUTE}/list`)
  ) {
    return null;
  }
  return (
    <Box w={240} mr={16}>
      <Box
        position={'fixed'}
        height={'100%'}
        w={256}
        padding={4}
        backgroundColor={'#1a202c'}
      >
        <Link to='/'>
          <Flex align='start' flexDirection='column'>
            <Heading
              as='h1'
              size='lg'
              letterSpacing={'tighter'}
              color={'white'}
            >
              ROUTOR
            </Heading>
            <Text fontWeight='700' color={'white'}>
              Field Protect
            </Text>
          </Flex>
        </Link>
        {/* <Divider my={4} /> */}
        <Box my={4} mx={-4}>
          <NavLink exact to={'/task-routes/list'}>
            <Flex
              align='start'
              p={4}
              backgroundColor={
                !pathname.includes('task-routes') ? '#1a202c' : '#6B00D7'
              }
            >
              <Text fontWeight='500' color={'white'}>
                スケジュール
              </Text>
            </Flex>
          </NavLink>
          {isAdmin && (
            <NavLink exact to={'/base-routes/list'}>
              <Flex
                align='start'
                p={4}
                backgroundColor={
                  !pathname.includes('base-routes') ? '#1a202c' : '#6B00D7'
                }
              >
                <Text fontWeight='500' color={'white'}>
                  ルート作成
                </Text>
              </Flex>
            </NavLink>
          )}
        </Box>
      </Box>
    </Box>
  );
}
