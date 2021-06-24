import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ApiReducerKey } from "constants/enums"
import { BASE_URL, ORDERS_URL } from "constants/env"
import { CreateOrderForm, OrderType } from "types/api"

const ordersApi = createApi({
  reducerPath: ApiReducerKey.ORDERS,
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: builder => ({
    getOrders: builder.query<OrderType[], null>({ query: () => ORDERS_URL }),
    getOrderById: builder.query<OrderType, number>({ query: id => `${ORDERS_URL}/${id}` }),
    createOrder: builder.mutation<OrderType, CreateOrderForm>({
      query: body => ({ url: ORDERS_URL, method: "POST", body })
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
