import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import userReducer from './Slice/UserSlice';
import { persistReducer, persistStore } from 'redux-persist';
import UnitReducer from "./Slice/UnitSlice"
import LocationReducer from "./Slice/LocationSlice";
import MaterialReducer from "./Slice/MaterialSlice";
import SupplierReducer from "./Slice/SupplierSlice";


// Persist config
const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

// Persisted reducers
const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    user: userReducer,
  })
);

// Root reducer
const rootReducer = combineReducers({
  persisted: persistedReducer,
  // Add non-persisted reducers here
  nonPersisted: combineReducers({
    unit: UnitReducer,
    location: LocationReducer,
    material: MaterialReducer,
    supplier:SupplierReducer
   
  }),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
