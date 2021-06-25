import { useGetWorkshopsQuery } from "api/workshops"
import Flex from "components/container/Flex"
import WorkshopList from "components/workshop/WorkshopList"
import { useState } from "react"
import styles from "./Page.module.scss"

const HomePage = () => {
  const [limit, setLimit] = useState(9)
  const { data } = useGetWorkshopsQuery(limit)

  const handleLoadMoreItem = () => {
    setLimit(limit => limit + 9)
  }

  if (!data) return null

  return (
    <Flex className={styles.home}>
      <WorkshopList items={data} limit={limit} onLoadMore={handleLoadMoreItem} />
    </Flex>
  )
}

export default HomePage
