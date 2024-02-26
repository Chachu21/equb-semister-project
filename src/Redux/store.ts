import { configureStore } from "@reduxjs/toolkit";
<<<<<<< HEAD
import UserReducer from './Features/userSlice'
=======
import UserReducer from "./Features/userSlice";
>>>>>>> a8265ca03a444941276f1bd0f2e9346a2dfae759

export const store = configureStore({
  reducer: {
    user: UserReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
<<<<<<< HEAD
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
=======
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
>>>>>>> a8265ca03a444941276f1bd0f2e9346a2dfae759
