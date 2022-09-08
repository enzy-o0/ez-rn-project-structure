import {createSlice} from '@reduxjs/toolkit';

export const ErrorSlice = createSlice({
  name: 'ErrorMessage',
  initialState: {
    isVisibleErrorModal: false,
    isErrorMsg: null,
    isErrorCode: null,
    isErrorToast: false,
  },
  reducers: {
    setIsVisibleModal: (state) => {
      state.isVisibleErrorModal = true;
    },
    setIsNotVisibleModal: (state) => {
      state.isVisibleErrorModal = false;
    },
    setErrorMsg: (state, action) => {
      state.isErrorMsg = action.payload;
    },
    setisErrorCode: (state, action) => {
      state.isErrorCode = action.payload;
    },
    setClear: (state) => {
      state.isVisibleErrorModal = false;
      state.isErrorMsg = null;
      state.isErrorCode = null;
    },
  },
});

export const {
  setIsVisibleModal,
  setIsNotVisibleModal,
  setErrorMsg,
  setisErrorCode,
  setClear,
} = ErrorSlice.actions;

export const ErrorMessageSelector = (state) => state.ErrorMessage;
