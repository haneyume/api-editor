import { configureStore } from '@reduxjs/toolkit';
import undoable from 'redux-undo';

import counterReducer from './counterSlice';
import apiItemReducer from './apiItemSlice';

export default configureStore({
  reducer: {
    counter: undoable(counterReducer),
    apiItem: apiItemReducer,
  },
});
