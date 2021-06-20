import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import { categoriesApiMiddleware, categoriesApiReducer } from "api/categories"
import { usersApiMiddleware, usersApiReducer } from "api/users"
import { ApiReducerKey } from "constants/enums"

export const store = configureStore({
  reducer: {
    [ApiReducerKey.CATEGORIES]: categoriesApiReducer,
    [ApiReducerKey.USERS]: usersApiReducer
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat(categoriesApiMiddleware, usersApiMiddleware)
  }
})

setupListeners(store.dispatch)
