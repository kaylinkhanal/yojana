'use client'
import {store,persistor } from './store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';

const reduxProvider = ({children}) =>{
    return (
        <Provider store={store}>
             <PersistGate loading={null} persistor={persistor}>
             {children}
             </PersistGate>
        </Provider>
    )
}

export default reduxProvider