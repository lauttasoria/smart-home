import { configureStore, createReducer } from '@reduxjs/toolkit'
import shopReducer from '../features/shop/shopSlice'
import { shopApi } from '../services/shopService'
import cartReducer from '../features/cart/cartSlice'
import authReducer from '../features/auth/authSlice'
import { receiptApi } from '../services/receiptsService'
import { authApi } from '../services/authService';
import { userApi } from '../services/userService'

export const store = configureStore({
    reducer: {
        shopReducer,
        cartReducer,
        authReducer,
        [shopApi.reducerPath]: shopApi.reducer,
        [receiptApi.reducerPath]: receiptApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(shopApi.middleware)
            .concat(receiptApi.middleware)
            .concat(authApi.middleware)
            .concat(userApi.middleware)
})