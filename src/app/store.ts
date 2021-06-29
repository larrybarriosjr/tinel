import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import { categoriesApiMiddleware, categoriesApiReducer } from "api/categories"
import { ordersApiMiddleware, ordersApiReducer } from "api/orders"
import { usersApiMiddleware, usersApiReducer } from "api/users"
import { workshopsApiMiddleware, workshopsApiReducer } from "api/workshops"
import { ApiReducerKeys } from "constants/enums"
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from "redux-persist"
import persistStore from "redux-persist/lib/persistStore"
import storage from "redux-persist/lib/storage"
import cartReducer, { cartName } from "states/cart"
import presentationReducer, { presentationName } from "states/presentation"
import workshopReducer, { workshopName } from "states/workshop"

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: [cartName, workshopName]
}

const reducers = combineReducers({
  [ApiReducerKeys.CATEGORIES]: categoriesApiReducer,
  [ApiReducerKeys.ORDERS]: ordersApiReducer,
  [ApiReducerKeys.USERS]: usersApiReducer,
  [ApiReducerKeys.WORKSHOPS]: workshopsApiReducer,
  [presentationName]: presentationReducer,
  [cartName]: cartReducer,
  [workshopName]: workshopReducer
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
