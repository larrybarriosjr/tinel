import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ApiReducerKeys } from "constants/enums"
import { BASE_URL, ORDERS_URL } from "constants/env"
import { CreateOrderForm, OrderType } from "types/api"

const ordersApi = createApi({
  reducerPath: ApiReducerKeys.ORDERS,
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: builder => ({
    createOrder: builder.mutation<OrderType, CreateOrderForm>({
      query: body => ({ url: ORDERS_URL, method: "POST", body })
    })
  })
})

export const {
  useCreateOrderMutation,
  reducer: ordersApiReducer,
  middleware: ordersApiMiddleware
} = ordersApi
