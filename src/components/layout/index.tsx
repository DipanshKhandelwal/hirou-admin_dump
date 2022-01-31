import * as React from 'react';
import { Flex, Box } from '@chakra-ui/react';
import { Sidebar } from '../sidebar';

type PageLayoutProps = React.ComponentPropsWithoutRef<'div'>;

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <Flex width={'100%'}>
      <Sidebar />
      <Box width={'100%'}>{children}</Box>
    </Flex>
  );
}
