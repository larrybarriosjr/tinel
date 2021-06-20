export type WorkshopsQuery = {
  page: number
  limit: number
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

export type OrderProductsType = WorkshopType & {
  quantity: number
}

export type CreateOrderBody = {
  products: OrderProductsType[]
  total: number
}
