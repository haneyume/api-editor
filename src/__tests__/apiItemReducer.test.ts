import { describe, it, expect, beforeAll } from 'vitest';

import { store } from '../redux';
import {
  newItem,
  updateCurrentItem,
  select,
  updateAllItems,
} from '../redux/apiItemSlice';

describe('apiItem', () => {
  beforeAll(() => {
    store.subscribe(() => {
      console.log(store.getState().apiItem);
    });
  });

  it('new item', () => {
    const count = store.getState().apiItem.items.length;

    store.dispatch(newItem({ name: 'test', type: 'item' }));

    expect(store.getState().apiItem.items.length).toBe(count + 1);
  });

  it('update current item', () => {
    store.dispatch(updateCurrentItem({ method: 'GET' }));
  });

  it('select item', () => {
    store.dispatch(select('test'));
  });

  it('update all items', () => {
    store.dispatch(updateAllItems([]));

    expect(store.getState().apiItem.items.length).toBe(0);
  });
});
