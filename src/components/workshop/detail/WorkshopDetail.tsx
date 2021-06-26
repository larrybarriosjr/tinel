import { ReactComponent as CalendarIcon } from "assets/icons/calendar.svg"
import { ReactComponent as ClockIcon } from "assets/icons/clock.svg"
import CategoryIcon from "components/common/CategoryIcon"
import Flex from "components/container/Flex"
import { WorkshopType } from "types/api"
import { displayDate, displayTime } from "utils/text-utils"
import styles from "./WorkshopDetail.module.scss"

type WorkshopDetailProps = {
  item: WorkshopType
}

const WorkshopDetail = ({ item }: WorkshopDetailProps) => {
  const { imageUrl, title, category, date } = item

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
      <div>
        <Flex className={styles.detail__datetime_container}>
          <CalendarIcon className={styles.detail__datetime_icon} height="24" width="24" />
          <h6 className={styles.detail__date} aria-label="workshop-date" aria-details={date}>
            {displayDate(date)}
          </h6>
          <ClockIcon className={styles.detail__datetime_icon} height="24" width="24" />
          <h6 aria-label="workshop-time">{displayTime(date)}</h6>
        </Flex>
        <h1 className={styles.detail__title} aria-label="workshop-title">
          {title}
        </h1>
      </div>
    </Flex>
  )
}

export default WorkshopDetail
