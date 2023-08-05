import { ActionIcon, Tooltip } from '@mantine/core';
import { IconFilePlus } from '@tabler/icons-react';

import { useAppDispatch } from '../redux';
import { newItem } from '../redux/apiItemSlice';

export const NewItemButton = () => {
  const dispatch = useAppDispatch();

  return (
    <Tooltip label="Add an api">
      <ActionIcon
        onClick={() => {
          dispatch(newItem({ name: '', type: 'item' }));
        }}
      >
        <IconFilePlus size={18} />
      </ActionIcon>
    </Tooltip>
  );
};
