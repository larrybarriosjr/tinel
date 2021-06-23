import WorkshopCategory from "./WorkshopCategory"
import styles from "./WorkshopItem.module.scss"

type WorkshopItemProps = {
  imageUrl: string
  title: string
  category: string
}

const WorkshopItem = ({ imageUrl, title, category }: WorkshopItemProps) => {
  return (
    <div className={styles.box}>
      <div className={styles.top_container}>
        <span className={styles.image_container}>
          <img src={imageUrl} alt={title} className={styles.image} />
        </span>
        <WorkshopCategory data-testid="category-icon" category={category} className={styles.category} />
      </div>
    </div>
  )
}

export default WorkshopItem
