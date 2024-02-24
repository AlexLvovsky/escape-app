import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import appStore from "./appStore";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
//import { thunk } from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};
//------------------
const persistedReducer = persistReducer(persistConfig, appStore);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  //middleware: [thunk],
});

export const persistor = persistStore(store);
//--------------

// export const store = configureStore({
//   reducer: { appStore },
// });
