import { OrderType } from "./api"

export interface CartState {
  cartItems: OrderType[]
  cartQuantity: number
  cartTotal: number
}

export interface UpdateWorkshopQuantityAction {
  id: number
  quantity: number
}
