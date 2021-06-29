import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { WorkshopCategories } from "constants/enums"
import { WorkshopFilterState } from "types/redux"

const initialState: WorkshopFilterState = {
  filterSelected: WorkshopCategories.ALL
}

const workshopSlice = createSlice({
  name: "workshopSlice",
  initialState,
  reducers: {
    selectFilter: (state, action: PayloadAction<WorkshopCategories>) => {
      state.filterSelected = action.payload
    },
    resetFilter: state => {
      state.filterSelected = WorkshopCategories.ALL
    }
  }
})

const { actions, reducer } = workshopSlice

export const { selectFilter, resetFilter } = actions
export const { name: workshopName } = workshopSlice
export default reducer
