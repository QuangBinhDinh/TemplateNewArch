import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducer';
import { api, domainApi, globalApi } from '@api/service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import { logger } from './middleware';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['category', 'config', 'posts'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const Store = configureStore({
    reducer: persistedReducer,
    middleware: gDM =>
        gDM({ serializableCheck: false })
            .concat(api.middleware)
            .concat(domainApi.middleware)
            .concat(globalApi.middleware)
            .concat(logger),
});
export default Store;

export const persistor = persistStore(Store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof Store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof Store.dispatch;
