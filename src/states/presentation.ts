import { createSlice } from "@reduxjs/toolkit"
import { PresentationState } from "types/presentation"

const initialState: PresentationState = {
  sidebarDisplay: false
}

const presentationSlice = createSlice({
  name: "presentationSlice",
  initialState,
  reducers: {
    showSidebar: state => {
      state.sidebarDisplay = true
    },
    hideSidebar: state => {
      state.sidebarDisplay = false
    }
  }
})

const { actions, reducer } = presentationSlice

export const { showSidebar, hideSidebar } = actions
export const { name: presentationName } = presentationSlice
export default reducer
