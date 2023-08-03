import { useContext, useState, useEffect } from 'react';

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
import jsonpath from 'jsonpath';

import ReactJson from 'react-json-view';

import { AppContext } from '../contexts';

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
              <BasicTab key={current.id} />
            </Tabs.Panel>

            <Tabs.Panel value="1" pt="xs">
              <RequestTab />
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
          onChange={(value) =>
            projectCtx.setSingleApiItem({
              method: value!,
            })
          }
        />

        <TextInput
          className="flex-1"
          variant="filled"
          label="Path"
          value={current.data?.path}
          onChange={(e) =>
            projectCtx.setSingleApiItem({
              path: e.currentTarget.value,
            })
          }
        />
      </Group>

      <TextInput
        className="flex-1"
        variant="filled"
        label="Description"
        value={current.data?.description}
        onChange={(e) =>
          projectCtx.setSingleApiItem(
            {
              description: e.currentTarget.value,
            },
            e.currentTarget.value,
          )
        }
      />

      <PropertyListItems label="Headers" field="headers" />

      <PropertyListItems label="Query Params" field="queryParams" />

      <PropertyListItems label="Path Variables" field="pathVariables" />

      <Textarea
        variant="filled"
        label="Body"
        minRows={5}
        autosize
        value={current.data?.body}
        onChange={(e) =>
          projectCtx.setSingleApiItem({
            body: e.currentTarget.value,
          })
        }
      />
    </Stack>
  );
};

const RequestTab = () => {
  const projectCtx = useContext(AppContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [jsonP, setJsonP] = useState<string>('$');
  const [jsonPResult, setJsonPResult] = useState<string>('');

  useEffect(() => {
    const current = projectCtx.currentApiItem;
    if (!current) {
      return;
    }

    try {
      const r = jsonpath.query(current.data?.response as any, jsonP);
      setJsonPResult(JSON.stringify(r, null, 2));
    } catch (error: any) {
      setJsonPResult(error.message);
    }
  }, [jsonP, projectCtx.currentApiItem]);

  const current = projectCtx.currentApiItem;
  if (!current) {
    return null;
  }

  const sendRequest = async () => {
    setLoading(true);

    const response = await axios({
      method: current.data?.method,
      url: current.data?.path,
      data: current.data?.body,
      headers: current.data?.headers?.reduce(
        (acc, item) => ({ ...acc, [item.key]: item.value }),
        {},
      ),
    });

    setLoading(false);

    projectCtx.setSingleApiItem({
      response: response.data,
    });
  };

  return (
    <Stack>
      <Button onClick={sendRequest} loading={loading}>
        Send Request
      </Button>

      <Card withBorder>
        <ReactJson
          src={(current.data?.response as any) || {}}
          theme={'monokai'}
          name={null}
          enableClipboard={false}
        />
      </Card>

      <Group>
        <TextInput
          className="flex-1"
          placeholder="JSON Path"
          value={jsonP}
          onChange={(e) => setJsonP(e.currentTarget.value)}
        />

        <TextInput
          className="flex-1"
          placeholder="JSON Path"
          value={jsonPResult}
          disabled
        />
      </Group>
    </Stack>
  );
};
