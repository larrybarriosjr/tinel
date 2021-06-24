import { ReactComponent as CalendarIcon } from "assets/icons/calendar.svg"
import { ReactComponent as ClockIcon } from "assets/icons/clock.svg"
import PrimaryButton from "components/common/button/PrimaryButton"
import Flex from "components/container/Flex"
import { useAppDispatch } from "hooks/redux"
import { addToCart } from "states/cart"
import { WorkshopType } from "types/api"
import { monetize } from "utils/number-utils"
import { displayDate, displayTime } from "utils/text-utils"
import styles from "./Workshop.module.scss"
import WorkshopCategory from "./WorkshopCategory"

type WorkshopItemProps = {
  item: WorkshopType
}

const WorkshopItem = ({ item }: WorkshopItemProps) => {
  const { imageUrl, title, category, date, price } = item

  const dispatch = useAppDispatch()

  const handleAddToCart = () => {
    dispatch(addToCart(item))
  }

  return (
    <div className={styles.item__box}>
      <div className={styles.item__graphics_container}>
        <span className={styles.item__image_container}>
          <img src={imageUrl} alt={title} aria-label="workshop-image" className={styles.item__image} />
        </span>
        <WorkshopCategory category={category} className={styles.item__category} />
      </div>
      <Flex className={styles.item__details_container}>
        <Flex className={styles.item__datetime_container}>
          <CalendarIcon className={styles.item__datetime_icon} height="18" width="18" />
          <h6 className={styles.item__date} aria-label="workshop-date">
            {displayDate(date)}
          </h6>
          <ClockIcon className={styles.item__datetime_icon} height="18" width="18" />
          <h6 aria-label="workshop-time">{displayTime(date)}</h6>
        </Flex>
        <Flex>
          <h4 className={styles.item__title} aria-label="workshop-title">
            {title}
          </h4>
        </Flex>
        <Flex className={styles.item__price_container}>
          <h3 className={styles.item__price} aria-label="workshop-price">
            {monetize(price)}
          </h3>
          <h6 className={styles.item__currency}>EUR</h6>
          <PrimaryButton
            onClick={handleAddToCart}
            className={styles.item__button_text}
            aria-label="workshop-button"
          >
            Add to Cart
          </PrimaryButton>
        </Flex>
      </Flex>
    </div>
  )
}

export default WorkshopItem
