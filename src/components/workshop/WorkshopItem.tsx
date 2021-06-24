import { ReactComponent as CalendarIcon } from "assets/icons/calendar.svg"
import { ReactComponent as ClockIcon } from "assets/icons/clock.svg"
import PrimaryButton from "components/common/button/PrimaryButton"
import Row from "containers/Row"
import { monetize } from "utils/number-utils"
import { displayDate, displayTime } from "utils/text-utils"
import WorkshopCategory from "./WorkshopCategory"
import styles from "./WorkshopItem.module.scss"

type WorkshopItemProps = {
  imageUrl: string
  title: string
  category: string
  date: string
  price: number
}

const WorkshopItem = ({ imageUrl, title, category, date, price }: WorkshopItemProps) => {
  return (
    <div className={styles.box}>
      <div className={styles.top_container}>
        <span className={styles.image_container}>
          <img src={imageUrl} alt={title} aria-label="workshop-image" className={styles.image} />
        </span>
        <WorkshopCategory category={category} className={styles.category} />
      </div>
      <Row className={styles.details_row}>
        <Row className={styles.datetime_row}>
          <CalendarIcon className={styles.datetime_icon} height="18" width="18" />
          <h6 className={styles.date} aria-label="workshop-date">
            {displayDate(date)}
          </h6>
          <ClockIcon className={styles.datetime_icon} height="18" width="18" />
          <h6 aria-label="workshop-time">{displayTime(date)}</h6>
        </Row>
        <Row>
          <h4 className={styles.title} aria-label="workshop-title">
            {title}
          </h4>
        </Row>
        <Row>
          <h3 className={styles.price} aria-label="workshop-price">
            {monetize(price)}
          </h3>
          <h6 className={styles.currency}>EUR</h6>
        </Row>
        <Row className={styles.button_container}>
          <PrimaryButton className={styles.button} aria-label="workshop-button">
            Add to Cart
          </PrimaryButton>
        </Row>
      </Row>
    </div>
  )
}

export default WorkshopItem
