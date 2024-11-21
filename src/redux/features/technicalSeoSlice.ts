import { Crawler, CrawlingData } from "@/types/technicalseo/technicalSeoTypes";
import { TechnicalSeoType } from "@/types/TechnicalSeoType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PersistPartial } from "redux-persist/es/persistReducer";
import { InitialState } from "@/types/technicalseo/technicalSeoTypes";

// interface SeoData {
//   metrics: TechnicalSeoType | null;
//   loading: boolean;
//   error: string | null;
//   _persist?: PersistPartial; // Add this if you're using redux-persist
// }

// const initialState: SeoData = {
//   metrics: null,
//   loading: false,
//   error: null,
// };

// new type

const initialState: InitialState = {
  id: 0,
  userId: 0,
  domain: "",
  createdAt: "",
  updatedAt: "",

  crawlings: [
    {
      crawler: {
        id: 0,
        title: "",
        description: "",
        createdAt: "",
        updatedAt: "",
      },
      crawlingId: 0,
      crawlingData: [],
      createdAt: "",
      updatedAt: "",
      projectId: 0,
    },
  ],
};

const technicalSeoData = createSlice({
  name: "technicalSeo",
  initialState,
  reducers: {
    // fetchTechnicalSEOStart(state) {
    //   state.loading = true;
    //   state.error = null;
    // },
    // setTechnicalSeo: (state, action: PayloadAction<TechnicalSeoType>) => {
    //   state.metrics = action.payload;
    // },
    // fetchTechnicalSEOFailure(state, action: PayloadAction<string>) {
    //   state.loading = false;
    //   state.error = action.payload;
    // },
    setTechnicalSeo: (state, action) => {
      // Update each field of the state

      state.id = action.payload.project.id;
      state.createdAt = action.payload.project.createdAt;
      state.updatedAt = action.payload.project.updatedAt;
      state.domain = action.payload.project.domain;
      state.updatedAt = action.payload.project.updatedAt;
      state.userId = action.payload.project.userId;
      state.crawlings = action.payload.project.crawlings;
    },
  },
});

export const {
  setTechnicalSeo,
  //   fetchTechnicalSEOFailure,
  //   fetchTechnicalSEOStart,
} = technicalSeoData.actions;

export default technicalSeoData.reducer;
