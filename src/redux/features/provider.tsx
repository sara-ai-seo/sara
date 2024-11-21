"use client"
import { Provider } from "react-redux";
import { store } from "../../app/store";
import React from "react";

function APpProvider({children}:{children: React.ReactNode}){
return (
    <Provider store={store}>
        {children}
    </Provider>
)
}

export default APpProvider;