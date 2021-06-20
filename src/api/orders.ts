import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ApiReducerKey } from "constants/enums"
import { BASE_URL, ORDERS_URL } from "constants/env"
import { CreateOrderBody } from "types/api"

const ordersApi = createApi({
  reducerPath: ApiReducerKey.ORDERS,
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: builder => ({
    getOrders: builder.query({ query: () => ORDERS_URL }),
    getOrderById: builder.query({ query: (id: number) => `${ORDERS_URL}/${id}` }),
    createOrder: builder.mutation({
      query: (body: CreateOrderBody) => ({ url: ORDERS_URL, method: "POST", body })
    })
  }),
  refetchOnReconnect: true
})

export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
  reducer: ordersApiReducer,
  middleware: ordersApiMiddleware
} = ordersApi
