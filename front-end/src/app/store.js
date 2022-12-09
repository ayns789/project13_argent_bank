import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/auth/authSlice';
import userReducer from '../slices/user/userSlice';

// import { getDefaultMiddleware } from '@reduxjs/toolkit';
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //     },
  //   }),
  // en production, devtools doit etre false
  devtools: true,
});
