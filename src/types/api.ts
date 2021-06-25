export type UserType = {
  id: number
  email: string
  name: string
  password: string
}

export type WorkshopType = {
  category: string
  date: string
  desc: string
  id: number
  imageUrl: string
  price: number
  title: string
  userId: number
}

export type OrderType = WorkshopType & {
  quantity: number
}

export type CreateOrderForm = {
  products: OrderType[]
  total: number
}
