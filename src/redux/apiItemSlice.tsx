import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { DNDTreeApiItem, ApiItem } from '../types';
import {
  defaultApiItems,
  createNewApiItemFolder,
  createNewApiItem,
} from '../types';

interface InitialState {
  items: DNDTreeApiItem[];
  selectedId: string;
  currentItem: DNDTreeApiItem | undefined;
}

const initialState: InitialState = {
  items: defaultApiItems(),
  selectedId: '',
  currentItem: undefined,
};

export const apiItemSlice = createSlice({
  name: 'apiItem',
  initialState,
  reducers: {
    newItem: (
      state,
      action: PayloadAction<{ name: string; type: 'item' | 'folder' }>,
    ) => {
      const { type } = action.payload;

      if (type === 'folder') {
        state.items.push(createNewApiItemFolder());
      } else if (type === 'item') {
        state.items.push(createNewApiItem());
      }
    },
    updateCurrentItem: (state, action: PayloadAction<Partial<ApiItem>>) => {
      const { items, selectedId } = state;
      const partialData = action.payload;

      const index = items.findIndex((item) => item.id === selectedId);
      if (index === -1) {
        return;
      }

      if (state.items[index].data) {
        state.items[index].data = {
          ...state.items[index].data!,
          ...partialData,
        };
      }

      state.currentItem = state.items[index];
    },
    updateCurrentItem2: (
      state,
      action: PayloadAction<{ key: keyof ApiItem; value: any }>,
    ) => {
      const { items, selectedId } = state;
      const { key, value } = action.payload;

      const index = items.findIndex((item) => item.id === selectedId);
      if (index === -1) {
        return;
      }

      if (state.items[index].data) {
        state.items[index].data![key] = value;
      }

      state.currentItem = state.items[index];
    },
    select: (state, action: PayloadAction<string>) => {
      const id = action.payload;

      state.selectedId = id;
      state.currentItem = state.items.find((item) => item.id === id);
    },
    updateAllItems: (state, action: PayloadAction<DNDTreeApiItem[]>) => {
      state.items = action.payload;
    },
  },
});

export default apiItemSlice.reducer;
export const {
  newItem,
  updateCurrentItem,
  updateCurrentItem2,
  select,
  updateAllItems,
} = apiItemSlice.actions;
