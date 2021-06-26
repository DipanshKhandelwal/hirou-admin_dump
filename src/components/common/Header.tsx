import React from "react";
import {
  Heading,
  Flex,
} from "@chakra-ui/react";
import { Logo } from "./Logo";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

const Header = (props: any) => {
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
      <ColorModeSwitcher />
    </Flex >
  );
};

export default Header;
