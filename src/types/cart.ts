import { OrderProductsType } from "./api"

export interface CartState {
  cartItems: OrderProductsType[]
  cartQuantity: number
  cartTotal: number
}

export interface UpdateWorkshopQuantityAction {
  id: number
  quantity: number
}
