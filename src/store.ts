import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import followersReducer from './reducers/followersReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    followers: followersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

