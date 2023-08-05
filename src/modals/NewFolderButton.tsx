import { ActionIcon, Tooltip } from '@mantine/core';
import { IconFolderPlus } from '@tabler/icons-react';

import { useAppDispatch } from '../redux';
import { newItem } from '../redux/apiItemSlice';

export const NewFolderButton = () => {
  const dispatch = useAppDispatch();

  return (
    <Tooltip label="Add a folder">
      <ActionIcon
        onClick={() => {
          dispatch(newItem({ name: '', type: 'folder' }));
        }}
      >
        <IconFolderPlus size={18} />
      </ActionIcon>
    </Tooltip>
  );
};
