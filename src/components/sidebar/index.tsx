import * as React from 'react';
import { Flex, Heading, Text, Box, Divider } from '@chakra-ui/react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { _isAdmin } from '../../store/selectors/App';
import routes from '../../constants/routes';
import { COMPANY_NAME } from '../../constants/strings';

const SIDE_BAR_OPTIONS = [
  {
    id: 'task-routes',
    to: `${routes.TASK_ROUTE}/list`,
    name: 'スケジュール',
    isAdminScreen: false,
  },
  {
    id: 'base-routes',
    to: `${routes.BASE_ROUTE}/list`,
    name: 'ルート作成',
    isAdminScreen: true,
  },
];

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
              {COMPANY_NAME}
            </Text>
          </Flex>
        </Link>
        <Divider my={4} />
        <Box my={4} mx={-4}>
          {SIDE_BAR_OPTIONS.map((option) => {
            if (option.isAdminScreen && !isAdmin) return null;
            const isSelected = pathname.includes(option.id)
            return (
              <NavLink key={option.id} exact to={option.to}>
                <Flex
                  align='start'
                  p={4}
                  backgroundColor={isSelected ? 'blue.600' : 'transparent'}
                >
                  <Text fontWeight='500' color={'white'}>
                    {option.name}
                  </Text>
                </Flex>
              </NavLink>
            )
          })}
        </Box>
      </Box>
    </Box>
  );
}
