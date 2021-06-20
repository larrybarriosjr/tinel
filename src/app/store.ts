import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import { categoriesApiMiddleware, categoriesApiReducer } from "api/categories"
import { ordersApiMiddleware, ordersApiReducer } from "api/orders"
import { usersApiMiddleware, usersApiReducer } from "api/users"
import { workshopsApiMiddleware, workshopsApiReducer } from "api/workshops"
import { ApiReducerKey } from "constants/enums"

export const store = configureStore({
  reducer: {
    [ApiReducerKey.CATEGORIES]: categoriesApiReducer,
    [ApiReducerKey.ORDERS]: ordersApiReducer,
    [ApiReducerKey.USERS]: usersApiReducer,
    [ApiReducerKey.WORKSHOPS]: workshopsApiReducer
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat(
      categoriesApiMiddleware,
      ordersApiMiddleware,
      usersApiMiddleware,
      workshopsApiMiddleware
    )
  }
})

setupListeners(store.dispatch)
