import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import { categoriesApiMiddleware, categoriesApiReducer } from "api/categories"
import { ordersApiMiddleware, ordersApiReducer } from "api/orders"
import { usersApiMiddleware, usersApiReducer } from "api/users"
import { workshopsApiMiddleware, workshopsApiReducer } from "api/workshops"
import { ApiReducerKey } from "constants/enums"
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from "redux-persist"
import persistStore from "redux-persist/es/persistStore"
import storage from "redux-persist/lib/storage"
import presentationReducer, { presentationName } from "states/presentation"

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: []
}

const reducers = combineReducers({
    [ApiReducerKey.CATEGORIES]: categoriesApiReducer,
    [ApiReducerKey.ORDERS]: ordersApiReducer,
    [ApiReducerKey.USERS]: usersApiReducer,
    [ApiReducerKey.WORKSHOPS]: workshopsApiReducer,
  [presentationName]: presentationReducer
})

const persistedReducer = persistReducer(persistConfig, reducers)

const serializableCheck = {
  ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
}

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({ serializableCheck }).concat(
      categoriesApiMiddleware,
      ordersApiMiddleware,
      usersApiMiddleware,
      workshopsApiMiddleware
    )
  }
})

export const persistor = persistStore(store)

setupListeners(store.dispatch)
