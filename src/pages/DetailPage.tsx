import { useGetUserByIdQuery } from "api/users"
import { useGetWorkshopByIdQuery } from "api/workshops"
import Flex from "components/container/Flex"
import WorkshopDetail from "components/workshop/detail/WorkshopDetail"
import { useParams } from "react-router-dom"
import styles from "./Page.module.scss"

const DetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const { data: item } = useGetWorkshopByIdQuery(id)
  const { data: user } = useGetUserByIdQuery(item?.userId || 0)

  if (!item) return null

  return (
    <Flex className={styles.detail}>
      <WorkshopDetail item={item} user={user} />
    </Flex>
  )
}

export default DetailPage
