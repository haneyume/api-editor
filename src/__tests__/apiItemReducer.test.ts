import { describe, it, expect, beforeAll } from 'vitest';

import { store } from '../redux';
import {
  newItem,
  updateCurrentItem,
  select,
  updateAllItems,
} from '../redux/features/apiItems/apiItemsSlice';

describe('apiItem', () => {
  beforeAll(() => {
    store.subscribe(() => {
      console.log(store.getState().apiItems);
    });
  });

  it('new item', () => {
    const count = store.getState().apiItems.items.length;

    store.dispatch(newItem({ name: 'test', type: 'item' }));

    expect(store.getState().apiItems.items.length).toBe(count + 1);
  });

  it('update current item', () => {
    store.dispatch(updateCurrentItem({ method: 'GET' }));
  });

  it('select item', () => {
    store.dispatch(select('test'));
  });

  it('update all items', () => {
    store.dispatch(updateAllItems([]));

    expect(store.getState().apiItems.items.length).toBe(0);
  });
});
