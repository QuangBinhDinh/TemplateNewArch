import { combineReducers } from '@reduxjs/toolkit';
import { api, domainApi, globalApi } from '@api/service';
import AsyncStorage from '@react-native-async-storage/async-storage';

//lưu defaultAddress khi checkout vào storage

const cartPersistConfig = {
    key: 'cart',
    storage: AsyncStorage,
    whitelist: ['defaultAddress'],
};
export const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer,
    [domainApi.reducerPath]: domainApi.reducer,
    [globalApi.reducerPath]: globalApi.reducer,
});
