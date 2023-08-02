import { v4 as uuidv4 } from 'uuid';

interface DNDTreeItem<T> {
  id: string;
  parent: string;
  text: string;
  droppable?: boolean;
  data?: T;
}

// ----------------------------------------------

interface ApiItem {
  method: string;
  path: string;
  description: string;

  headers: Array<{ key: string; value: string }>;
  queryParams: Array<{ key: string; value: string }>;
  pathVariables: Array<{ key: string; value: string }>;
  body: string;

  response: string;
}

type DNDTreeApiItem = DNDTreeItem<ApiItem>;

// ----------------------------------------------

export const defaultApiItems: () => DNDTreeApiItem[] = () => {
  const folderId = uuidv4();

  return [
    {
      id: folderId,
      parent: 'root',
      text: 'Users',
      droppable: true,
    },
    {
      id: uuidv4(),
      parent: folderId,
      text: 'GET users',
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
    {
      id: uuidv4(),
      parent: folderId,
      text: 'Create a user',
      droppable: false,
      data: {
        method: 'POST',
        path: '/api/v1/users',
        description: 'Create a user',
        headers: [],
        queryParams: [],
        pathVariables: [],
        body: '',
        response: '',
      },
    },
  ];
};

// ----------------------------------------------

export type { DNDTreeApiItem, ApiItem };
