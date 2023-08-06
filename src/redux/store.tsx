import { configureStore } from '@reduxjs/toolkit';
import undoable from 'redux-undo';

import counterReducer from './counterSlice';
import apiItemReducer from './apiItemSlice';

export const store = configureStore({
  reducer: {
    counter: undoable(counterReducer),
    apiItem: apiItemReducer,
  },
});

// store.dispatch({
//   type: 'apiItem/newItem',
//   payload: { name: '', type: 'item' },
// });
