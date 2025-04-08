import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import reducer from "./reducer";
import api from "./middleware/api";
import toastDisplay from "./middleware/toast";
import logger from "./middleware/logger";

const persistConfig = {
  key: "root", // Key used to store the state in localStorage
  storage,
  whitelist: ["elements"],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        ignoredPaths: ["elements.someNonSerializablePath"],
      },
    }).concat(api, toastDisplay, logger("Hello")),
});

const persistor = persistStore(store);

export { store, persistor };
