import Flex from "components/container/Flex"
import dayjs from "dayjs"
import { WorkshopType } from "types/api"
import styles from "./Workshop.module.scss"
import WorkshopItem from "./WorkshopItem"

type WorkshopListProps = {
  items: WorkshopType[]
}

const WorkshopList = ({ items }: WorkshopListProps) => {
  if (!items.length) return null

  return (
    <Flex className={styles.list__container}>
      {[...items]
        .sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix())
        .map(item => (
          <WorkshopItem key={item.id} item={item} />
        ))}
    </Flex>
  )
}

export default WorkshopList
