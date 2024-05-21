import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import userReducer from './Slice/UserSlice';
import { persistReducer, persistStore } from 'redux-persist';

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
  nonPersisted: (state = {}, action) => state,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
