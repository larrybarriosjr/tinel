import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ApiReducerKey } from "constants/enums"
import { BASE_URL, WORKSHOPS_LIMIT, WORKSHOPS_PAGE, WORKSHOPS_URL } from "constants/env"
import { WorkshopsQuery, WorkshopType } from "types/api"

const workshopsApi = createApi({
  reducerPath: ApiReducerKey.WORKSHOPS,
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: builder => ({
    getWorkshops: builder.query<WorkshopType[], WorkshopsQuery | null>({
      query: query => {
        if (!query) return WORKSHOPS_URL

        const { page, limit } = query
        return WORKSHOPS_URL + WORKSHOPS_PAGE + page + WORKSHOPS_LIMIT + limit
      }
    }),
    getWorkshopById: builder.query<WorkshopType, number>({ query: id => `${WORKSHOPS_URL}/${id}` })
  })
})

export const {
  useGetWorkshopsQuery,
  useGetWorkshopByIdQuery,
  reducer: workshopsApiReducer,
  middleware: workshopsApiMiddleware
} = workshopsApi
