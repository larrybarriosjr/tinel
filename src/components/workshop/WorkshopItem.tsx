import styles from "./WorkshopItem.module.scss"

type WorkshopItemProps = {
  imageUrl: string
  title: string
  category: string
}

const WorkshopItem = ({ imageUrl, title, category }: WorkshopItemProps) => {
  return (
    <div className={styles.box}>
      <span className={styles.image_container}>
        <img src={imageUrl} alt={title} className={styles.image} />
      </span>
    </div>
  )
}

export default WorkshopItem
