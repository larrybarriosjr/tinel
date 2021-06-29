import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { PresentationState } from "types/redux"

const initialState: PresentationState = {
  drawerDisplay: false,
  drawerMounted: false,
  checkoutModalDisplay: false,
  checkoutModalMounted: false
}

const presentationSlice = createSlice({
  name: "presentationSlice",
  initialState,
  reducers: {
    toggleDrawerDisplay: (state, action: PayloadAction<boolean>) => {
      state.drawerDisplay = action.payload
    },
    toggleDrawerMounted: (state, action: PayloadAction<boolean>) => {
      state.drawerMounted = action.payload
    },
    toggleCheckoutModalDisplay: (state, action: PayloadAction<boolean>) => {
      state.checkoutModalDisplay = action.payload
    },
    toggleCheckoutModalMounted: (state, action: PayloadAction<boolean>) => {
      state.checkoutModalMounted = action.payload
    }
  }
})

const { actions, reducer } = presentationSlice

export const {
  toggleDrawerDisplay,
  toggleDrawerMounted,
  toggleCheckoutModalDisplay,
  toggleCheckoutModalMounted
} = actions
export const { name: presentationName } = presentationSlice
export default reducer
