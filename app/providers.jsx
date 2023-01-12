'use client';
import {SessionProvider} from 'next-auth/react'
import { useStore } from "react-redux";
import { wrapper } from "../store/store";

import { AnimatePresence } from "framer-motion";
import { PersistGate } from "redux-persist/integration/react";
function Providers({children}) {
  const store = useStore((state) => state);
    return (
    <AnimatePresence mode="wait">
      <SessionProvider>
        <PersistGate persistor={store.__persistor} loading={<div>Loading...</div>}>
            {children}
        </PersistGate>
      </SessionProvider>
    </AnimatePresence>
    )   
}
export default wrapper.withRedux(Providers);