import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import registeredUsersReducer from "./features/registeredUsers/registeredUsersSlice"
import collectionImagesSlice from "./features/collectionImages/collectionImagesSlice";

const persistConfig = {
    key: 'users', 
    storage,
};

const persistCollectionsConfig = {
    key: 'collections', 
    storage,
}

const persistedReducer = persistReducer(persistConfig, registeredUsersReducer);
const persistedCollectionsReducer = persistReducer(persistCollectionsConfig, collectionImagesSlice)

const store = configureStore({
    reducer: {
        users: persistedReducer,
        collections: persistedCollectionsReducer,
    },
})

export default store;
export const persistor = persistStore(store);