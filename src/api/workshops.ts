import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ApiReducerKey } from "constants/enums"
import { BASE_URL, WORKSHOPS_LIMIT, WORKSHOPS_URL } from "constants/env"
import { WorkshopQuery, WorkshopType } from "types/api"

const workshopsApi = createApi({
  reducerPath: ApiReducerKey.WORKSHOPS,
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: builder => ({
    getWorkshops: builder.query<WorkshopType[], WorkshopQuery | null>({
      query: query => {
        let url = WORKSHOPS_URL
        if (query?.limit) url += WORKSHOPS_LIMIT + query.limit
        if (query?.category && query.category !== "all") url += "&category=" + query.category
        return url
      }
    }),
    getWorkshopById: builder.query<WorkshopType, string>({ query: id => `${WORKSHOPS_URL}/${id}` })
  })
})

export const {
  useGetWorkshopsQuery,
  useGetWorkshopByIdQuery,
  reducer: workshopsApiReducer,
  middleware: workshopsApiMiddleware
} = workshopsApi
