import * as React from 'react';
import { Flex, Heading, Text, Box, Divider } from '@chakra-ui/react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { _isAdmin } from '../../store/selectors/App';
import routes from '../../constants/routes';
import { Logo } from '../common/Logo';

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
  // {
  //   id: 'information',
  //   to: `${routes.INFORMATIOM_ROUTE}`,
  //   name: 'おしらせ機能',
  //   isAdminScreen: false,
  // },
];

export function Sidebar() {
  const isAdmin: boolean = useSelector(_isAdmin);
  const { pathname } = useLocation();
  return null

  if (
    !(
      pathname.includes(routes.TASK_ROUTE) ||
      pathname.includes(routes.BASE_ROUTE) ||
      pathname.includes(routes.INFORMATIOM_ROUTE)
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
        backgroundColor='#2b6cb0'
      >
        <Link to='/'>
          <Flex align='center' mr={5}>
            <Heading as='h1' size='lg' letterSpacing={'tighter'}>
              <Logo h='3vh' pointerEvents='none' />
            </Heading>
          </Flex>
        </Link>
        <Divider my={4} />
        <Box my={4} mx={-4}>
          {SIDE_BAR_OPTIONS.map((option) => {
            if (option.isAdminScreen && !isAdmin) return null;
            const isSelected = pathname.includes(option.id);
            return (
              <NavLink key={option.id} exact to={option.to}>
                <Flex
                  align='start'
                  p={4}
                  backgroundColor={isSelected ? 'blue.400' : '#2b6cb0'}
                >
                  <Text fontWeight='500' color={'white'}>
                    {option.name}
                  </Text>
                </Flex>
              </NavLink>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
