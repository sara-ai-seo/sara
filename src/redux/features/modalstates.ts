import { RootState } from "@/app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface ModalStateType {
    currentModal: string
}
const initialState: ModalStateType = {
    currentModal: ''
}

const CurrentModal = createSlice({
    name: 'currentModal',
    initialState,
    reducers: {
        setModal: (state, action) => {
            state.currentModal = action.payload
        }
    }
})
export const {setModal} = CurrentModal.actions
export const showingModal = (state: ModalStateType) => state.currentModal
export default CurrentModal.reducer