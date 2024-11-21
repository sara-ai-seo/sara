import { RootState } from "@/app/store";
import { NavStates } from "@/types/navTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";




const initialState: NavStates = {
    current: ''
}

export const navState = createSlice({
    name: 'navstate',
    initialState,
    reducers: {
        setCurrentState: (state, action: PayloadAction<string>) => {
            state.current = action.payload
        }
    }
})

export const { setCurrentState} = navState.actions;
export const currentNav = (state: RootState) => state.nav
export default navState.reducer
