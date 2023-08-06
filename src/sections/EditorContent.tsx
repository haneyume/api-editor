import { useState } from 'react';

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
  Button,
} from '@mantine/core';

import axios from 'axios';
import ReactJson from 'react-json-view';

import { useAppSelector, useAppDispatch } from '../redux';
import { updateCurrentItem } from '../redux/apiItemSlice';

// import { Test } from './property/PropertyUIs';
import { PropertyListItems } from '../property-uis/PropertyListItems';
import { PropertyJsonPath } from '../property-uis/PropertyJsonPath';

export const EditorContent = () => {
  const currentItem = useAppSelector((state) => state.apiItem.currentItem);

  if (!currentItem) {
    return null;
  }

  return (
    <ScrollArea className="h-full">
      <Card withBorder>
        <Stack>
          <Title order={3}>{currentItem.text}</Title>

          {/* <Test /> */}

          <Tabs defaultValue="0">
            <Tabs.List>
              <Tabs.Tab value="0">Api Settings</Tabs.Tab>
              <Tabs.Tab value="1">Request</Tabs.Tab>
              <Tabs.Tab value="2">JSON Path</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="0" pt="xs">
              <BasicTab key={currentItem.id} />
            </Tabs.Panel>

            <Tabs.Panel value="1" pt="xs">
              <RequestTab key={currentItem.id} />
            </Tabs.Panel>

            <Tabs.Panel value="2" pt="xs">
              <PropertyJsonPath key={currentItem.id} />
            </Tabs.Panel>
          </Tabs>
        </Stack>
      </Card>
    </ScrollArea>
  );
};

const BasicTab = () => {
  const currentItem = useAppSelector((state) => state.apiItem.currentItem);
  const dispatch = useAppDispatch();

  if (!currentItem) {
    return null;
  }

  return (
    <Stack>
      <Group position="apart">
        <Select
          label="Method"
          variant="filled"
          data={['GET', 'POST', 'PUT', 'DELETE']}
          value={currentItem.data?.method}
          onChange={(value) => {
            dispatch(updateCurrentItem({ method: value! }));
          }}
        />

        <TextInput
          className="flex-1"
          variant="filled"
          label="Path"
          value={currentItem.data?.path}
          onChange={(e) => {
            dispatch(updateCurrentItem({ path: e.target.value }));
          }}
        />
      </Group>

      <TextInput
        className="flex-1"
        variant="filled"
        label="Description"
        value={currentItem.data?.description}
        onChange={(e) => {
          dispatch(updateCurrentItem({ description: e.target.value }));
        }}
      />

      <PropertyListItems label="Headers" field="headers" />

      <PropertyListItems label="Query Params" field="queryParams" />

      <PropertyListItems label="Path Variables" field="pathVariables" />

      <Textarea
        variant="filled"
        label="Body"
        minRows={5}
        autosize
        value={currentItem.data?.body}
        onChange={(e) => {
          dispatch(updateCurrentItem({ body: e.target.value }));
        }}
      />
    </Stack>
  );
};

const RequestTab = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const currentItem = useAppSelector((state) => state.apiItem.currentItem);
  const dispatch = useAppDispatch();

  if (!currentItem) {
    return null;
  }

  const sendRequest = async () => {
    setLoading(true);

    const response = await axios({
      method: currentItem.data?.method,
      url: currentItem.data?.path,
      data: currentItem.data?.body,
      headers: currentItem.data?.headers?.reduce(
        (acc, item) => ({ ...acc, [item.key]: item.value }),
        {},
      ),
    });

    setLoading(false);

    dispatch(updateCurrentItem({ response: response.data }));
  };

  return (
    <Stack>
      <Button onClick={sendRequest} loading={loading}>
        Send Request
      </Button>

      <Card withBorder>
        <ReactJson
          src={(currentItem.data?.response as any) || {}}
          theme={'monokai'}
          name={null}
          enableClipboard={false}
        />
      </Card>
    </Stack>
  );
};
