import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ApiReducerKeys } from "constants/enums"
import { BASE_URL, USERS_URL } from "constants/env"
import { UserType } from "types/api"

const usersApi = createApi({
  reducerPath: ApiReducerKeys.USERS,
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: builder => ({
    getUserById: builder.query<UserType, number>({ query: id => (id ? `${USERS_URL}/${id}` : "") })
  })
})

export const { useGetUserByIdQuery, reducer: usersApiReducer, middleware: usersApiMiddleware } = usersApi
