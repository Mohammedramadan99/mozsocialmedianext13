import { HYDRATE, createWrapper } from "next-redux-wrapper";

const mainReducer = (state, action) => {
  // hydration is a process of filling an object with some data
  // this is called when server side request happens
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  } else {
    // whenever we deal with static rendering or client side rendering, this will be the case
    // reducers is the combinedReducers
    return reducers(state, action);
  }
};
export default mainReducer;
