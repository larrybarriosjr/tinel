import Flex from "components/container/Flex"
import { WorkshopType } from "types/api"
import { sortByDateDesc } from "utils/array-utils"
import styles from "./Workshop.module.scss"
import WorkshopItem from "./WorkshopItem"

type WorkshopListProps = {
  items: WorkshopType[]
}

const WorkshopList = ({ items }: WorkshopListProps) => {
  if (!items.length) return null

  return (
    <Flex className={styles.list__container}>
      {sortByDateDesc(items, "date").map(item => (
        <WorkshopItem key={item.id} item={item} />
      ))}
    </Flex>
  )
}

export default WorkshopList
