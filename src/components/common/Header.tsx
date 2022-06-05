import React, { useMemo } from 'react';
import { Flex, Button, Spacer, Text } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { IUser } from '../../models/user';
import { handleLogout } from '../../store/thunks/App';
import { MdArrowBack } from 'react-icons/md';
import { goBack } from '../../services/navigation';
import Routes from '../../constants/routes';
import { useLocation } from 'react-router-dom';

const showBackButton = (pathname: string) => {
  return pathname.includes(`${Routes.TASK_ROUTE}/map`) || (pathname.includes(Routes.BASE_ROUTE) &&
    pathname !== `${Routes.BASE_ROUTE}/list`)
}

const Header = (props: any) => {
  const user: IUser = props.user;
  const { pathname } = useLocation();

  const showBack = useMemo(() => showBackButton(pathname), [pathname])

  return (
    <Flex
      as='nav'
      align='center'
      justify='space-between'
      wrap='wrap'
      padding={4}
      {...props}
      boxShadow='md'
    >
      {showBack &&
        <Button onClick={goBack} >
          <MdArrowBack />
        </Button>}
      <Spacer />
      {user && (
        <>
          <Text marginRight={2}>{user.username}</Text>
          <Button variant='outline' onClick={handleLogout} size='sm'>
            ログアウト
          </Button>
        </>
      )}
      <ColorModeSwitcher />
    </Flex>
  );
};

export default Header;
