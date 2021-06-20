import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ApiReducerKey } from "constants/enums"
import { BASE_URL, CATEGORIES_URL } from "constants/env"

const categoriesApi = createApi({
  reducerPath: ApiReducerKey.CATEGORIES,
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: builder => ({
    getCategories: builder.query({ query: () => CATEGORIES_URL })
  })
})

export const {
  useGetCategoriesQuery,
  reducer: categoriesApiReducer,
  middleware: categoriesApiMiddleware
} = categoriesApi
