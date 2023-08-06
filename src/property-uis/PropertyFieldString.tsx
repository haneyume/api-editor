import { Text, TextInput } from '@mantine/core';

import { useAppSelector } from '../redux';

import { store } from '../redux';
import type { RootState } from '../redux';

import { DNDTreeItem } from '../types';

interface Props<T> {
  category: keyof Pick<RootState, 'apiItem'>;
  field: keyof T;
  action?: string;
  targetObject?: string;
}

export function PropertyFieldString<T>({
  category,
  field,
  action = 'updateCurrentItem',
  targetObject = 'currentItem',
}: Props<T>) {
  // @ts-ignore
  const currentItem = useAppSelector((state) => state[category][targetObject]);
  if (!currentItem) {
    return <Text>Error: currentItem === undefined</Text>;
  }

  const currentItemData = (currentItem as DNDTreeItem<T>)?.data;
  if (!currentItemData) {
    return <Text>Error: currentItemData === undefined</Text>;
  }

  return (
    <TextInput
      label={field as string}
      value={currentItemData[field] as string}
      onChange={(event) => {
        store.dispatch({
          type: `${category}/${action}`,
          payload: {
            [field]: event.currentTarget.value,
          },
        });
      }}
    />
  );
}
