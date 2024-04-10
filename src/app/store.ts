import { configureStore } from "@reduxjs/toolkit";
import stageSlice from "../views/stage/features/stageReducer";
import loaderSlice from "../views/loading/features/loadingReducer";

export const store = configureStore({
  reducer: {
    stage: stageSlice,
    loader: loaderSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
