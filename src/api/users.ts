import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ApiReducerKey } from "constants/enums"
import { BASE_URL, USERS_URL } from "constants/env"

const usersApi = createApi({
  reducerPath: ApiReducerKey.USERS,
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: build => ({
    getUsers: build.query({ query: () => USERS_URL }),
    getUserById: build.query({ query: (id: number) => `${USERS_URL}/${id}` })
  })
})

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  reducer: usersApiReducer,
  middleware: usersApiMiddleware
} = usersApi
