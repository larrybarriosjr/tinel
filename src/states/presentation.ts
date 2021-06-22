import { createSlice } from "@reduxjs/toolkit"
import { PresentationState } from "types/presentation"

const initialState: PresentationState = {
  drawerDisplay: false
}

const presentationSlice = createSlice({
  name: "presentationSlice",
  initialState,
  reducers: {
    showSidebar: state => {
      state.drawerDisplay = true
    },
    hideSidebar: state => {
      state.drawerDisplay = false
    }
  }
})

const { actions, reducer } = presentationSlice

export const { showSidebar, hideSidebar } = actions
export const { name: presentationName } = presentationSlice
export default reducer
