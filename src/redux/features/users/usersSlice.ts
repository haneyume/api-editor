import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

import { userApi } from '../../apis/userApi';

type User = {
  id: string;
  name: string;
};

const usersAdapter = createEntityAdapter<User>();

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  // const response = await client.get('/fakeApi/users');
  // return response.data;
  return [];
});

const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState(),
  reducers: {
    addOne: usersAdapter.addOne,
    updateOne: usersAdapter.updateOne,
    removeOne: usersAdapter.removeOne,
  },
  extraReducers(builder) {
    builder.addMatcher(
      userApi.endpoints.getUserById.matchFulfilled,
      (state, action) => {
        usersAdapter.setAll(state, [
          {
            id: `${action.payload.id}`,
            name: action.payload.name,
          },
        ]);
      },
    );
  },
});

const userSelector = usersAdapter.getSelectors<RootState>(
  (state) => state.users,
);

export const {
  addOne: addOneUser,
  updateOne: updateOneUser,
  removeOne: removeOneUser,
} = usersSlice.actions;

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectTotal: selectTotalUsers,
} = userSelector;

export default usersSlice.reducer;
