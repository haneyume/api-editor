import { useContext } from 'react';

import {
  ScrollArea,
  Card,
  Stack,
  Group,
  TextInput,
  Select,
  Textarea,
  Title,
  Tabs,
} from '@mantine/core';

import { AppContext } from '../contexts';
import type { DNDTreeApiItem } from '../types';

import { PropertyListItems } from './property/PropertyListItems';

export const EditorContent = () => {
  const projectCtx = useContext(AppContext);

  const current = projectCtx.currentApiItem;
  if (!current) {
    return null;
  }

  return (
    <ScrollArea className="h-full">
      <Card withBorder>
        <Stack>
          <Title order={3}>{current.text}</Title>

          <Tabs defaultValue="0">
            <Tabs.List>
              <Tabs.Tab value="0">Basic</Tabs.Tab>
              <Tabs.Tab value="1">Request</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="0" pt="xs">
              <BasicTab />
            </Tabs.Panel>

            <Tabs.Panel value="1" pt="xs">
              WIP
            </Tabs.Panel>
          </Tabs>
        </Stack>
      </Card>
    </ScrollArea>
  );
};

const BasicTab = () => {
  const projectCtx = useContext(AppContext);

  const current = projectCtx.currentApiItem;
  if (!current) {
    return null;
  }

  return (
    <Stack>
      <Group position="apart">
        <Select
          label="Method"
          variant="filled"
          data={['GET', 'POST', 'PUT', 'DELETE']}
          value={current.data?.method}
        />
        <TextInput
          className="flex-1"
          variant="filled"
          label="Path"
          value={current.data?.path}
        />
      </Group>

      <PropertyListItems label="Headers" />

      <PropertyListItems label="Query Params" />

      <PropertyListItems label="Path Variables" />

      <Textarea variant="filled" label="Body" minRows={5} autosize />
    </Stack>
  );
};
