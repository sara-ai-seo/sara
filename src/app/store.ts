import { combineReducers, configureStore } from "@reduxjs/toolkit";
import navSlice from "../redux/features/navSlice";
import modalstates from "@/redux/features/modalstates";
import { persistReducer } from "redux-persist";
// import storageSession from "redux-persist/lib/storage/session";
import persistStore from "redux-persist/es/persistStore";
import userSlice from "@/redux/features/userSlice";
import { configureApiCall } from "./utils/apicalls/axiosInterceptor";
import performanceMetricSlice from "@/redux/features/performanceMetric slice";
import propertySlice from "@/redux/features/propertySlice";
import technicalSeoSlice from "@/redux/features/technicalSeoSlice";
import loaderSlice from "@/redux/features/loaderSlice";
import updateDataStateSlice from "@/redux/features/updateDataStateSlice";
import storage from "@/redux/storage";

const userPersistConfig = {
  key: "user", // Specify a unique key for userSlice
  storage,
};

const performancePersistConfig = {
  key: "performance",
  storage,
};
const propertyPersistConfig = {
  key: "property",
  storage,
};
const technicalSeoConfig = {
  key: "technicalSeo",
  storage,
};

const rootReducer = combineReducers({
  nav: navSlice,
  performance: persistReducer(performancePersistConfig, performanceMetricSlice),
  property: persistReducer(propertyPersistConfig, propertySlice),
  user: persistReducer(userPersistConfig, userSlice), // Persist userSlice
  technicalSeo: persistReducer(technicalSeoConfig, technicalSeoSlice),
  currentModal: modalstates,
  loading: loaderSlice,
  updateDataState: updateDataStateSlice,
});

const persistedReducer = persistReducer(
  { key: "root", storage, serialize: true, blacklist: ["loading"] },
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

configureApiCall(store);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
