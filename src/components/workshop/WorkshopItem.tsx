import { ReactComponent as CalendarIcon } from "assets/icons/calendar.svg"
import { ReactComponent as ClockIcon } from "assets/icons/clock.svg"
import PrimaryButton from "components/common/button/PrimaryButton"
import Row from "containers/Row"
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
          <img src={imageUrl} alt={title} className={styles.image} />
        </span>
        <WorkshopCategory data-testid="category-icon" category={category} className={styles.category} />
      </div>
      <Row className={styles.details_row}>
        <Row className={styles.datetime_row}>
          <CalendarIcon className={styles.datetime_icon} height="18" width="18" />
          <h6 className={styles.date} data-testid="workshop-date">
            {displayDate(date)}
          </h6>
          <ClockIcon className={styles.datetime_icon} height="18" width="18" />
          <h6 data-testid="workshop-time">{displayTime(date)}</h6>
        </Row>
        <Row>
          <h4 className={styles.title} data-testid="workshop-title">
            {title}
          </h4>
        </Row>
        <Row>
          <h3 className={styles.price} data-testid="workshop-price">
            {price.toString()},00
          </h3>
          <h6 className={styles.currency}>EUR</h6>
        </Row>
        <Row className={styles.button_container}>
          <PrimaryButton className={styles.button} data-testid="workshop-button">
            Add to Cart
          </PrimaryButton>
        </Row>
      </Row>
    </div>
  )
}

export default WorkshopItem
