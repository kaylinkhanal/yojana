"use client"
import {NextUIProvider} from '@nextui-org/react'
import { Toaster } from 'react-hot-toast';

const Providers=({children})=> {
  return (
    <NextUIProvider>
      <Toaster />
      {children}
    </NextUIProvider>
  )
}

export default Providers