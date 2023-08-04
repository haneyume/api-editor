import { useContext } from 'react';

import { ActionIcon, Tooltip } from '@mantine/core';
import { IconFolderPlus } from '@tabler/icons-react';

import { AppContext } from '../contexts';
import { createNewApiItemFolder } from '../types';

export const NewFolderButton = () => {
  const projectCtx = useContext(AppContext);

  return (
    <Tooltip label="Add a folder">
      <ActionIcon
        onClick={() => {
          projectCtx.setApiItems([
            ...projectCtx.apiItems,
            createNewApiItemFolder(),
          ]);
        }}
      >
        <IconFolderPlus size={18} />
      </ActionIcon>
    </Tooltip>
  );
};
