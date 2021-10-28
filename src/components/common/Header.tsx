import React from "react";
import {
  Heading,
  Flex,
  Button,
  Spacer,
  Text
} from "@chakra-ui/react";
import { Logo } from "./Logo";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { IUser } from "../../models/user";
import { handleLogout } from "../../store/thunks/App";
import { Link } from "react-router-dom";

const Header = (props: any) => {
  const user: IUser = props.user

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={4}
      h='8vh'
      {...props}
    >
      <Link to='/' >
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg" letterSpacing={"tighter"}>
            <Logo h="3vh" pointerEvents="none" />
          </Heading>
        </Flex>
      </Link>
      <Spacer />
      {user && (
        <>
          <Text marginRight={2} >{user.username}</Text>
          <Button variant="outline" onClick={handleLogout} >ログアウト</Button>
        </>
      )}
      <ColorModeSwitcher />
    </Flex >
  );
};

export default Header;
