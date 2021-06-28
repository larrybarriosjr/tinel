import { createSlice } from "@reduxjs/toolkit"
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
    showDrawer: state => {
      state.drawerDisplay = true
    },
    hideDrawer: state => {
      state.drawerDisplay = false
    },
    mountDrawer: state => {
      state.drawerMounted = true
    },
    unmountDrawer: state => {
      state.drawerMounted = false
    },
    showCheckoutModal: state => {
      state.checkoutModalDisplay = true
    },
    hideCheckoutModal: state => {
      state.checkoutModalDisplay = false
    },
    mountCheckoutModal: state => {
      state.checkoutModalMounted = true
    },
    unmountCheckoutModal: state => {
      state.checkoutModalMounted = false
    }
  }
})

const { actions, reducer } = presentationSlice

export const {
  showDrawer,
  hideDrawer,
  mountDrawer,
  unmountDrawer,
  showCheckoutModal,
  hideCheckoutModal,
  mountCheckoutModal,
  unmountCheckoutModal
} = actions
export const { name: presentationName } = presentationSlice
export default reducer
