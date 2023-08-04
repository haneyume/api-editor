import { useContext } from 'react';

import { ActionIcon, Tooltip } from '@mantine/core';
import { IconFilePlus } from '@tabler/icons-react';

import { AppContext } from '../contexts';
import { createNewApiItem } from '../types';

export const NewItemButton = () => {
  const projectCtx = useContext(AppContext);

  return (
    <Tooltip label="Add an api">
      <ActionIcon
        onClick={() => {
          projectCtx.setApiItems([...projectCtx.apiItems, createNewApiItem()]);
        }}
      >
        <IconFilePlus size={18} />
      </ActionIcon>
    </Tooltip>
  );
};
