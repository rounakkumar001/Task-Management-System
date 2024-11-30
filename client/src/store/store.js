import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import userReducer from '../features/userSlice.js';
import taskReducer from '../features/taskSlice.js'; 

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);
// const persistedReducer2 = persistReducer(persistConfig, taskReducer);

const store = configureStore({
  reducer: {
    user: persistedReducer,
    tasks : taskReducer
  },
});

export const persistor = persistStore(store);
export default store;