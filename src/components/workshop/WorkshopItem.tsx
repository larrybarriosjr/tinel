import { ReactComponent as CalendarIcon } from "assets/icons/calendar.svg"
import { ReactComponent as ClockIcon } from "assets/icons/clock.svg"
import PrimaryButton from "components/common/button/PrimaryButton"
import Row from "containers/Row"
import { monetize } from "utils/number-utils"
import { displayDate, displayTime } from "utils/text-utils"
import styles from "./Workshop.module.scss"
import WorkshopCategory from "./WorkshopCategory"

type WorkshopItemProps = {
  imageUrl: string
  title: string
  category: string
  date: string
  price: number
}

const WorkshopItem = ({ imageUrl, title, category, date, price }: WorkshopItemProps) => {
  return (
    <div className={styles.item__box}>
      <div className={styles.item__top_container}>
        <span className={styles.item__image_container}>
          <img src={imageUrl} alt={title} aria-label="workshop-image" className={styles.item__image} />
        </span>
        <WorkshopCategory category={category} className={styles.item__category} />
      </div>
      <Row className={styles.item__details_row}>
        <Row className={styles.item__datetime_row}>
          <CalendarIcon className={styles.item__datetime_icon} height="18" width="18" />
          <h6 className={styles.item__date} aria-label="workshop-date">
            {displayDate(date)}
          </h6>
          <ClockIcon className={styles.item__datetime_icon} height="18" width="18" />
          <h6 aria-label="workshop-time">{displayTime(date)}</h6>
        </Row>
        <Row>
          <h4 className={styles.item__title} aria-label="workshop-title">
            {title}
          </h4>
        </Row>
        <Row>
          <h3 className={styles.item__price} aria-label="workshop-price">
            {monetize(price)}
          </h3>
          <h6 className={styles.item__currency}>EUR</h6>
        </Row>
        <Row className={styles.item__button_container}>
          <PrimaryButton className={styles.item__button} aria-label="workshop-button">
            Add to Cart
          </PrimaryButton>
        </Row>
      </Row>
    </div>
  )
}

export default WorkshopItem
