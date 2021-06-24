import { createSlice } from "@reduxjs/toolkit"
import { PresentationState } from "types/redux"

const initialState: PresentationState = {
  drawerDisplay: false,
  drawerMounted: false
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
    },
    mountDrawer: state => {
      state.drawerMounted = true
    },
    unmountDrawer: state => {
      state.drawerMounted = false
    }
  }
})

const { actions, reducer } = presentationSlice

export const { showSidebar, hideSidebar, mountDrawer, unmountDrawer } = actions
export const { name: presentationName } = presentationSlice
export default reducer
