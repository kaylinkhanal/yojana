'use client'
import {store } from './store'
import { Provider } from 'react-redux'

const reduxProvider = ({children}) =>{
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default reduxProvider