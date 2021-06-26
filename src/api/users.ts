import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ApiReducerKey } from "constants/enums"
import { BASE_URL, USERS_URL } from "constants/env"
import { UserType } from "types/api"

const usersApi = createApi({
  reducerPath: ApiReducerKey.USERS,
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: builder => ({
    getUsers: builder.query<UserType[], null>({ query: () => USERS_URL }),
    getUserById: builder.query<UserType, number>({ query: id => (id ? `${USERS_URL}/${id}` : "") })
  })
})

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  reducer: usersApiReducer,
  middleware: usersApiMiddleware
} = usersApi
