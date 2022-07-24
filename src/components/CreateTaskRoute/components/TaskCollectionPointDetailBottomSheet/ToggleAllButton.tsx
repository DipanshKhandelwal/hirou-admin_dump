import * as React from 'react';
import { Button } from '@chakra-ui/react';
import { _isAdmin } from '../../../../store/selectors/App';
import { useSelector } from 'react-redux';
import { DARK_RED } from '../../../../constants/colors';

interface ToggleAllButtonProps {
  complete: boolean;
}

export const ToggleAllButton = (
  props: ToggleAllButtonProps
) => {

  const {
    complete
  } = props
  const isAdmin: boolean = useSelector(_isAdmin);

  const color = complete ? 'white' : DARK_RED

  let hoverStyle = {}
  if (isAdmin)
    hoverStyle = {
      borderColor: 'black',
      backgroundColor: `${color}33`
    }

  return (
    <Button
      width='120px'
      height='120px'
      colorScheme='red'
      variant={complete ? 'solid' : 'outline'}
      onClick={() => { }}
    >
      全てを選択
    </Button>
  );
};
