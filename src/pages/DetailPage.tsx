import { useGetWorkshopByIdQuery } from "api/workshops"
import Flex from "components/container/Flex"
import WorkshopDetail from "components/workshop/detail/WorkshopDetail"
import { useParams } from "react-router-dom"
import styles from "./Page.module.scss"

const DetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const { data } = useGetWorkshopByIdQuery(id)

  if (!data) return null

  return (
    <Flex className={styles.detail}>
      <WorkshopDetail item={data} />
    </Flex>
  )
}

export default DetailPage
