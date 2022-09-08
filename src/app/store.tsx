import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {UsersSlice} from '../reducers/UsersSlice';
import {SignUpSlice} from '../reducers/SignUpSlice';
import {RefreshSlice} from '~/reducers/RefreshSlice';
import {ErrorSlice} from '~/reducers/ErrorSlice';

const combinedReducer = combineReducers({
  users: UsersSlice.reducer,
  signUp: SignUpSlice.reducer,
  refresh: RefreshSlice.reducer,
  ErrorMessage: ErrorSlice.reducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export default configureStore({
  reducer: rootReducer,
});
