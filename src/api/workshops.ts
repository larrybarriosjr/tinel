import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ApiReducerKey } from "constants/enums"
import { BASE_URL, WORKSHOPS_LIMIT, WORKSHOPS_PAGE, WORKSHOPS_URL } from "constants/env"
import { WorkshopsQuery } from "types/api"

const workshopsApi = createApi({
  reducerPath: ApiReducerKey.WORKSHOPS,
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: build => ({
    getWorkshops: build.query({
      query: (query: WorkshopsQuery | null) => {
        if (!query) return WORKSHOPS_URL

        const { page, limit } = query
        return WORKSHOPS_URL + WORKSHOPS_PAGE + page + WORKSHOPS_LIMIT + limit
      }
    }),
    getWorkshopById: build.query({ query: (id: number) => `${WORKSHOPS_URL}/${id}` })
  })
})

export const {
  useGetWorkshopsQuery,
  useGetWorkshopByIdQuery,
  reducer: workshopsApiReducer,
  middleware: workshopsApiMiddleware
} = workshopsApi
