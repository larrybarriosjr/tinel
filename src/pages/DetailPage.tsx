import { useGetUserByIdQuery } from "api/users"
import { useGetWorkshopByIdQuery } from "api/workshops"
import Flex from "components/container/Flex"
import WorkshopDetail from "components/workshop/detail/WorkshopDetail"
import { useAppSelector } from "hooks/redux"
import { useParams } from "react-router-dom"
import styles from "./Page.module.scss"

const DetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const { data: item } = useGetWorkshopByIdQuery(id)
  const { data: user } = useGetUserByIdQuery(item ? item.userId : 0)
  const cartItems = useAppSelector(state => state.cartSlice.cartItems)
  const quantity = cartItems.filter(item => item.id.toString() === id).length

  if (!item) return null

  return (
    <Flex className={styles.detail}>
      <WorkshopDetail item={item} user={user} quantity={quantity} />
    </Flex>
  )
}

export default DetailPage
