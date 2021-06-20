import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import { categoriesApiMiddleware, categoriesApiReducer } from "api/categories"
import { ApiReducerKey } from "constants/enums"

export const store = configureStore({
  reducer: {
    [ApiReducerKey.CATEGORIES]: categoriesApiReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(categoriesApiMiddleware)
})

setupListeners(store.dispatch)
