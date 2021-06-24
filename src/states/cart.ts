import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { WorkshopType } from "types/api"
import { CartState, UpdateWorkshopQuantityAction } from "types/redux"

const initialState: CartState = {
  cartItems: [],
  cartQuantity: 0,
  cartTotal: 0
}

const setCartQuantity = (state: CartState) => {
  if (!state.cartItems.length) {
    state.cartQuantity = 0
  } else {
    state.cartQuantity = state.cartItems.map(item => item.quantity).reduce((acc, cur) => acc + cur)
  }
}

const setCartTotal = (state: CartState) => {
  if (!state.cartItems.length) {
    state.cartTotal = 0
  } else {
    state.cartTotal = state.cartItems
      .map(item => item.price * item.quantity)
      .reduce((acc, cur) => acc + cur)
  }
}

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<WorkshopType>) => {
      const existingItem = state.cartItems.find(item => action.payload.id === item.id)

      if (!existingItem) {
        state.cartItems.push({ ...action.payload, quantity: 1 })
      } else {
        state.cartItems = state.cartItems.map(item => {
          if (action.payload.id === item.id) {
            item.quantity += 1
          }
          return item
        })
      }

      setCartTotal(state)
      setCartQuantity(state)
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      if (state.cartItems.length) {
        state.cartItems = state.cartItems.filter(item => action.payload !== item.id)
      }

      setCartTotal(state)
      setCartQuantity(state)
    },
    updateWorkshopQuantity: (state, action: PayloadAction<UpdateWorkshopQuantityAction>) => {
      const existingItem = state.cartItems.find(item => action.payload.id === item.id)

      if (existingItem) {
        state.cartItems = state.cartItems.map(item => {
          if (action.payload.id === item.id) {
            item.quantity = action.payload.quantity
          }
          return item
        })
      }

      setCartTotal(state)
      setCartQuantity(state)
    },
    clearCart: state => {
      state.cartItems = []
      setCartTotal(state)
      setCartQuantity(state)
    }
  }
})

const { actions, reducer } = cartSlice

export const { addToCart, removeFromCart, updateWorkshopQuantity, clearCart } = actions
export const { name: cartName } = cartSlice
export default reducer
