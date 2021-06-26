import CategoryIcon from "components/common/CategoryIcon"
import Flex from "components/container/Flex"
import { WorkshopType } from "types/api"
import styles from "./WorkshopDetail.module.scss"

type WorkshopDetailProps = {
  item: WorkshopType
}

const WorkshopDetail = ({ item }: WorkshopDetailProps) => {
  const { imageUrl, title, category } = item

  return (
    <Flex className={styles.detail__container}>
      <div className={styles.detail__graphics_container}>
        <div className={styles.detail__image_container}>
          <img src={imageUrl} alt={title} className={styles.detail__image} aria-label="workshop-image" />
        </div>
        <CategoryIcon
          category={category}
          role="img"
          aria-label="workshop-category"
          name={category}
          containerClassName={styles.detail__category_container}
        />
      </div>
    </Flex>
  )
}

export default WorkshopDetail
