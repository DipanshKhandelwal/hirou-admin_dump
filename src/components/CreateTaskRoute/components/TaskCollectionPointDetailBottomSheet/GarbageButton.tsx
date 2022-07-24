import * as React from 'react';
import { Button } from '@chakra-ui/react';
import { ITaskCollection } from '../../../../models/taskCollection';
import { _isAdmin } from '../../../../store/selectors/App';
import { useSelector } from 'react-redux';
import { getGarbageColor, getGarbageIcon } from '../../../../constants/garbages';

export enum GarbageButtonTypes {
  small = 'small',
  large = 'large',
}

interface GarbageButtonProps {
  taskCollection: ITaskCollection;
  size: GarbageButtonTypes;
  onClick?: Function;
}

export const GarbageButton = (
  props: GarbageButtonProps,
) => {
  const { taskCollection, size, onClick } = props

  const isAdmin: boolean = useSelector(_isAdmin);
  const garbageColor = getGarbageColor(taskCollection.garbage.name)

  const color = taskCollection.complete ? 'white' : garbageColor
  const backgroundColor = taskCollection.complete ? garbageColor : 'white'

  const icon = getGarbageIcon(taskCollection.garbage.name, color)

  let hoverStyle = {}
  if (isAdmin)
    hoverStyle = {
      borderColor: 'black',
      backgroundColor: `${color}33`
    }

  if (size == GarbageButtonTypes.small) {
    return (
      <Button
        key={taskCollection.id}
        h={10}
        w={10}
        p={0}
        m={0}
        borderRadius='50%'
        borderWidth={1}
        borderStyle='solid'
        color={color}
        borderColor={color}
        _hover={hoverStyle}
        backgroundColor={backgroundColor}
        onClick={() => onClick?.()}
      >
        {icon}
      </Button>
    );
  }

  return (
    <Button
      key={taskCollection.id}
      m={0.5}
      fontSize={10}
      h={12}
      p={0}
      borderWidth={1}
      borderStyle='solid'
      color={color}
      borderColor={color}
      _hover={hoverStyle}
      backgroundColor={backgroundColor}
      onClick={() => onClick?.()}
    >
      {icon}
      {taskCollection.garbage.name}
    </Button>
  );
};
