import {createSlice} from '@reduxjs/toolkit';

export const SignUpSlice = createSlice({
  name: 'userData',
  initialState: {
    id: '',
    pswd: '',
    phone: '',
    name: '',
    birth: '',
    addr: '',
  },
  reducers: {
    saveId: (state, action) => {
      state.id = action.payload;
    },
    savePassword: (state, action) => {
      state.pswd = action.payload;
    },
    savePhone: (state, action) => {
      state.phone = action.payload;
    },
    saveName: (state, action) => {
      state.name = action.payload;
    },
    saveBirth: (state, action) => {
      state.birth = action.payload;
    },
    saveAddr: (state, action) => {
      state.addr = action.payload;
    },
    userClear: (state) => {
      state.id = '';
      state.pswd = '';
      state.phone = '';
      state.name = '';
      state.birth = '';
      state.addr = '';
    },
  },
});

export const {
  saveId,
  savePassword,
  savePhone,
  saveName,
  saveBirth,
  saveAddr,
  userClear,
} = SignUpSlice.actions;

export const SignUpSelector = (state) => state.userData;
