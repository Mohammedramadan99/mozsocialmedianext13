import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
// import users from "./usersSlice";
import postsReducer from "./postsSlice";
import usersReducer from "./usersSlice";


const combinedReducer = combineReducers({
    posts:postsReducer,
    users:usersReducer
});

export const store = () =>
  configureStore({
    reducer: combinedReducer,
  });

export const wrapper = createWrapper(store);