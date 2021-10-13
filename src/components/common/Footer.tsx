import { Box, Stack, } from '@chakra-ui/react'
import * as React from 'react'
import { Center, HStack, Link, Text, TextProps } from '@chakra-ui/layout'
import { Link as DomLink } from "react-router-dom";

export const Copyright = (props: TextProps) => (
  <Text fontSize="sm" {...props}>
    &copy; {new Date().getFullYear()} Routor All rights reserved.
  </Text>
)

const Footer = () => (
  <Box >
    <Stack>
      <Center>
        <HStack>
          <DomLink to='/privacy-policy' >
            <Link fontSize={14} my={2} textDecor='underline' >Privacy Policy</Link>
          </DomLink>
          <a href='https://www.fieldprotect.co.jp/contact/' >
            <Link fontSize={14} my={2} textDecor='underline' >Contact Us</Link>
          </a>
        </HStack>
      </Center>
      <Copyright alignSelf={{ base: 'center', sm: 'start' }} />
    </Stack>
  </Box>
)
export default Footer