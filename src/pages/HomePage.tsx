import { useGetWorkshopsQuery } from "api/workshops"
import Flex from "components/container/Flex"
import WorkshopList from "components/workshop/WorkshopList"
import styles from "./Page.module.scss"

const HomePage = () => {
  const { data } = useGetWorkshopsQuery(9)

  if (!data) return null

  return (
    <Flex className={styles.home}>
      <WorkshopList items={data} />
    </Flex>
  )
}

export default HomePage
