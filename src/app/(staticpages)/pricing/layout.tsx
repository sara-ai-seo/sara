"use client"

import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import React from 'react'

interface Props {
    children: JSX.Element
}

function layout({children}:Props) {
  return (
    <PayPalScriptProvider options={{clientId:process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? ""}}>
        {children}
    </PayPalScriptProvider>
  )
}

export default layout