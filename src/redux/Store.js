import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import userReducer from './Slice/UserSlice';
import { persistReducer, persistStore } from 'redux-persist';
const rootReducer = combineReducers({
    // Redux Persisted store reducers
    persisted: persistReducer(
      {
        key: 'root',
        storage,
        version: 1,
      },
      combineReducers({
        user: userReducer,
      })
    ),
  
    // Non-persisted store reducers
    nonPersisted: combineReducers({
     
    }),
  });

  export const store = configureStore({
    reducer: rootReducer, // Use rootReducer here
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, // Disables the serializable check
      }),
  });
  

  export const persistor = persistStore(store); 