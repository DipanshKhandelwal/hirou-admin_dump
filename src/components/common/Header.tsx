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
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"tighter"}>
          <Logo h="3vh" pointerEvents="none" />
        </Heading>
      </Flex>
      <Spacer />
      {user && (
        <>
          <Text color='blackAlpha.800' marginRight={2} >{user.username}</Text>
          <Button variant="outline" onClick={handleLogout} >Logout</Button>
        </>
      )}
      <ColorModeSwitcher />
    </Flex >
  );
};

export default Header;
