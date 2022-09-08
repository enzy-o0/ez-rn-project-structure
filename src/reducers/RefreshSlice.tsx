import {createSlice} from '@reduxjs/toolkit';

export const RefreshSlice = createSlice({
  name: 'RefreshSlice',
  initialState: {
    isRefresh: false,
  },
  reducers: {
    setIsRefreshed: (state) => {
      state.isRefresh = true;
    },
    setIsRefreshedClear: (state) => {
      state.isRefresh = false;
    },
  },
});

export const {
  setIsRefreshed,
  setIsRefreshedClear,
} = RefreshSlice.actions;

export const RefreshSelector = (state) => state.refresh;
