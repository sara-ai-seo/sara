import { UserType } from "@/types/userType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState : UserType = {
    user: {
        id: 0,
        email: "",
        fullName: "",
        account_type: "",
        createdAt: "",
        updatedAt: "",
        name: "",
    },
    message: '',
    token: ''
}

const userDetail = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUser: (state, action: PayloadAction<Partial<UserType['user']>> ) => {
            state.user = {...state.user,...action.payload}
        },
        setToken: (state, action) => {
            state.token = action.payload
        },
    
    }

})

export const { setUser, setToken} = userDetail.actions;

export default userDetail.reducer;