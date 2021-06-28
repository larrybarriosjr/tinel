import { useGetUserByIdQuery } from "api/users"
import { useGetWorkshopByIdQuery, useGetWorkshopsQuery } from "api/workshops"
import Flex from "components/container/Flex"
import SimilarWorkshops from "components/workshop/detail/SimilarWorkshops"
import WorkshopDetail from "components/workshop/detail/WorkshopDetail"
import { useAppSelector } from "hooks/redux"
import { useParams } from "react-router-dom"
import styles from "./Page.module.scss"

const DetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const { data: items } = useGetWorkshopsQuery(null)
  const { data: item } = useGetWorkshopByIdQuery(id)
  const { data: user } = useGetUserByIdQuery(item ? item.userId : 0)
  const cartItems = useAppSelector(state => state.cartSlice.cartItems)
  const workshopItem = cartItems.find(item => item.id.toString() === id)
  const quantity = workshopItem ? workshopItem.quantity : 1

  if (!items) return null
  if (!item) return null

  return (
    <Flex className={styles.detail}>
      <WorkshopDetail item={item} user={user} quantity={quantity} />
      <SimilarWorkshops current={item} items={items} />
    </Flex>
  )
}

export default DetailPage
