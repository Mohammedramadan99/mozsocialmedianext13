'use client';
import {SessionProvider} from 'next-auth/react'
import { Provider, useStore } from "react-redux";
import { wrapper } from "../store/store";
// import {store} from '../store/store'
import { AnimatePresence } from "framer-motion";
// import { PersistGate } from "redux-persist/integration/react";
function Providers({children,...rest}) {
  
  const {store, props} = wrapper.useWrappedStore(rest);

    return (
    <AnimatePresence mode="wait">
      <SessionProvider>
        <Provider store={store}>
          {children}
        </Provider>
      </SessionProvider>
    </AnimatePresence>
    )   
}
export default wrapper.withRedux(Providers);