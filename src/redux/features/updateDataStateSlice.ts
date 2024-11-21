import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UpdateDataState = {
  page: string;
  state: "empty" | "";
};

const initialState: UpdateDataState = {
  page: "",
  state: "",
};

const updateDataStateSlice = createSlice({
  name: "updateDataState",
  initialState,
  reducers: {
    setUpdateDataState: (state, action: PayloadAction<UpdateDataState>) => {
      return action.payload;
    },
  },
});

export const { setUpdateDataState } = updateDataStateSlice.actions;
export default updateDataStateSlice.reducer;
