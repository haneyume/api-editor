import { useContext } from 'react';

import { ActionIcon, Tooltip } from '@mantine/core';
import { IconFilePlus } from '@tabler/icons-react';

import { v4 as uuidv4 } from 'uuid';

import { AppContext } from '../contexts';

export const NewItemButton = () => {
  const projectCtx = useContext(AppContext);

  return (
    <Tooltip label="Add an api">
      <ActionIcon
        onClick={() => {
          projectCtx.setApiItems([
            ...projectCtx.apiItems,
            {
              id: uuidv4(),
              parent: 'root',
              text: 'New Api',
              droppable: false,
              data: {
                method: 'GET',
                path: '/api/v1/users',
                description: 'Get users',
                headers: [],
                queryParams: [],
                pathVariables: [],
                body: '',
                response: '',
              },
            },
          ]);
        }}
      >
        <IconFilePlus size={18} />
      </ActionIcon>
    </Tooltip>
  );
};
