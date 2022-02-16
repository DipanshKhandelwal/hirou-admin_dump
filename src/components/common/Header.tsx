import React from 'react';
import { Flex, Button, Spacer, Text } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { IUser } from '../../models/user';
import { handleLogout } from '../../store/thunks/App';
const Header = (props: any) => {
  const user: IUser = props.user;

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
