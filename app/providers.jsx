'use client';
import {SessionProvider} from 'next-auth/react'

import { wrapper } from "../store/store";

import { AnimatePresence } from "framer-motion";

import { PersistGate } from "redux-persist/integration/react";
import Spinner from '../components/Spinner';
function Providers({children,...rest}) {
  
  const {store} = wrapper.useWrappedStore(rest);

    return (
    <AnimatePresence mode="wait">
      <SessionProvider>
        <PersistGate persistor={store.__persistor} loading={
          <div style={{position:"relative"}}>
            <Spinner type="full" />
          </div>
        }>
          {children}
        </PersistGate>
      </SessionProvider>
    </AnimatePresence>
    )   
}
export default wrapper.withRedux(Providers);