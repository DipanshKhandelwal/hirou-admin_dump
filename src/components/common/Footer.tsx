import * as React from 'react';
import { Box, HStack, Link, Text, TextProps } from '@chakra-ui/layout';
import { Link as DomLink } from 'react-router-dom';

export const Copyright = (props: TextProps) => (
  <Text fontSize='sm' {...props}>
    &copy; {new Date().getFullYear()} Routor All rights reserved.
  </Text>
);

const Footer = () => (
  <Box>
    <HStack my={2}>
      <DomLink to='/privacy-policy'>
        <Link fontSize={14} mx={2} textDecor='underline'>
          プライバシーポリシー
        </Link>
      </DomLink>
      <a href='https://www.fieldprotect.co.jp/contact/'>
        <Link fontSize={14} mx={2} textDecor='underline'>
          お問い合わせ
        </Link>
      </a>
    </HStack>
    <Copyright alignSelf={{ base: 'center', sm: 'start' }} />
  </Box>
);
export default Footer;
