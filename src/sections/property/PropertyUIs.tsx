import { ReactNode } from 'react';

import { z, ZodSchema } from 'zod';

const mySchema = z.string();

import { Stack, TextInput, Accordion, Text, Button } from '@mantine/core';

import {
  // useAppSelector,
  useAppDispatch,
} from '../../redux';
import { newItem } from '../../redux/apiItemSlice';

export const PropertySection = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => {
  return (
    <Accordion.Item value={label}>
      <Accordion.Control className="bg-neutral-800">{label}</Accordion.Control>
      <Accordion.Panel>
        <Stack>{children}</Stack>
      </Accordion.Panel>
    </Accordion.Item>
  );
};

export const PropertyFieldString = ({ z }: { z: ZodSchema }) => {
  // const currentItem = useAppSelector((state) => state.apiItem.currentItem);
  const dispatch = useAppDispatch();

  return (
    <>
      <Text>{JSON.stringify(z)}</Text>

      <Button onClick={() => dispatch(newItem({ name: '', type: 'item' }))}>
        newItem
      </Button>

      {/* <Button onClick={() => dispatch(updateCurrentItem({}))}>updateValue</Button> */}
      <TextInput />
    </>
  );
};

export const Test = () => {
  return <PropertyFieldString z={mySchema} />;
};
