import Flex from "components/container/Flex"
import { WorkshopType } from "types/api"
import styles from "./WorkshopDetail.module.scss"

type WorkshopDetailProps = {
  item: WorkshopType
}

const WorkshopDetail = ({ item }: WorkshopDetailProps) => {
  const { imageUrl, title } = item

  return (
    <Flex className={styles.detail__container}>
      <div className={styles.detail__image_container}>
        <img src={imageUrl} alt={title} className={styles.detail__image} aria-label="workshop-image" />
      </div>
    </Flex>
  )
}

export default WorkshopDetail
