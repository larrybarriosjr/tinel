import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ApiReducerKeys, WorkshopCategories } from "constants/enums"
import { BASE_URL, CATEGORIES_URL } from "constants/env"

const categoriesApi = createApi({
  reducerPath: ApiReducerKeys.CATEGORIES,
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: builder => ({
    getCategories: builder.query<WorkshopCategories[], null>({ query: () => CATEGORIES_URL })
  })
})

export const {
  useGetCategoriesQuery,
  reducer: categoriesApiReducer,
  middleware: categoriesApiMiddleware
} = categoriesApi
