import { useContext } from 'react';

import { ActionIcon, Tooltip } from '@mantine/core';
import { IconFolderPlus } from '@tabler/icons-react';

import { v4 as uuidv4 } from 'uuid';

import { AppContext } from '../contexts';

export const NewFolderButton = () => {
  const projectCtx = useContext(AppContext);

  return (
    <Tooltip label="Add a folder">
      <ActionIcon
        onClick={() => {
          projectCtx.setApiItems([
            ...projectCtx.apiItems,
            {
              id: uuidv4(),
              parent: 'root',
              text: 'Folder',
              droppable: true,
            },
          ]);
        }}
      >
        <IconFolderPlus size={18} />
      </ActionIcon>
    </Tooltip>
  );
};
