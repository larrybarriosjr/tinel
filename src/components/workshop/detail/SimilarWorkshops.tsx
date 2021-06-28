import Flex from "components/container/Flex"
import { WorkshopType } from "types/api"
import WorkshopItem from "../list/WorkshopItem"
import styles from "./WorkshopDetail.module.scss"

type SimilarWorkshopsProps = {
  current: WorkshopType
  items: WorkshopType[]
}

const SimilarWorkshops = ({ current, items }: SimilarWorkshopsProps) => {
  const similarItems = items
    .filter(item => item.id !== current.id)
    .filter(item => item.category === current.category)
    .slice(0, 3)

  if (!similarItems.length) return null

  return (
    <div className={styles.similar__container}>
      <h2 className={styles.similar__title}>Similar Workshops</h2>
      <Flex className={styles.similar__list}>
        {similarItems.map(item => (
          <WorkshopItem key={item.id} item={item} />
        ))}
      </Flex>
    </div>
  )
}

export default SimilarWorkshops
