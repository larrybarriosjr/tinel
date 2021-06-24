import { store } from "app/store"
import { OrderType } from "./api"

// Redux Types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Cart Types
export interface CartState {
  cartItems: OrderType[]
  cartQuantity: number
  cartTotal: number
}

export interface UpdateWorkshopQuantityAction {
  id: number
  quantity: number
}

// Presentation Types
export interface PresentationState {
  drawerDisplay: boolean
  drawerMounted: boolean
}
