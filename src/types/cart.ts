import { OrderProductsType } from "./api"

export interface CartState {
  cartItems: OrderProductsType[]
  cartQuantity: number
  cartTotal: number
}
