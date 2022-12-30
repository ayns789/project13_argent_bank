import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from '../slices/auth/authSlice';
import userReducer from '../slices/user/userSlice';
import { loadState } from '../services/browserStorage.ts';
// import { getDefaultMiddleware } from '@reduxjs/toolkit';

const combinedReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'auth/logOut') {
    state = undefined;
    localStorage.clear();
  }
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadState(),

  // en production, devtools doit etre false
  // devtools: true,
});

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;
