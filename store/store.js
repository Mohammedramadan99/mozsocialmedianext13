import { createStore, applyMiddleware } from "redux";
import { createWrapper } from "next-redux-wrapper";
import thunkMiddleware from "redux-thunk";
import {rootReducer} from "./rootReducer";
import logger from "redux-logger";


const storage = require('redux-persist/lib/storage').default;


// BINDING MIDDLEWARE
const bindMiddleware = (middleware) => {
  // if (process.env.NODE_ENV !== 'production') { // because we don't want redux dev tool to run in production
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  // }
// return applyMiddleware(...middleware);
};

const makeStore = ({ isServer }) => {
  if (isServer) {
    //If it's on server side, create a store
    return createStore(rootReducer, bindMiddleware([thunkMiddleware, logger]));
  } else {
    //If it's on client side, create a store which will persist
    const {
      persistStore,
      persistReducer,
      autoRehydrate,
    } = require("redux-persist");
    const storage = require("redux-persist/lib/storage").default;

    const persistConfig = {
      key: "nextjs",
      whitelist: ["users"], // only counter will be persisted, add other reducers if needed
      storage, // if needed, use a safer storage
    };

    const persistedReducer = persistReducer(persistConfig, rootReducer); // Create a new reducer with our existing reducer

    const store = createStore(
      persistedReducer,
      bindMiddleware([thunkMiddleware, logger])
    ); // Creating the store again

    store.__persistor = persistStore(store); // This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature

    return store;
  }
};


// const store = (initialState) =>
//   configureStore({
//     reducer,
//     initialState, // remove this
//   });
export const wrapper = createWrapper(makeStore, { debug: true });

// export const wrapper = createWrapper(store, { debug: true });

// export default store; 