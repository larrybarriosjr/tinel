import { ReactComponent as CalendarIcon } from "assets/icons/calendar.svg"
import { ReactComponent as ClockIcon } from "assets/icons/clock.svg"
import { ReactComponent as CartIcon } from "assets/icons/empty-cart.svg"
import PrimaryButton from "components/common/button/PrimaryButton"
import Flex from "components/container/Flex"
import { Routes } from "constants/enums"
import { useAppDispatch } from "hooks/redux"
import { Link } from "react-router-dom"
import { addToCart } from "states/cart"
import { mountDrawer, showSidebar } from "states/presentation"
import { WorkshopType } from "types/api"
import { monetize } from "utils/number-utils"
import { displayDate, displayTime } from "utils/text-utils"
import styles from "./Workshop.module.scss"
import WorkshopCategoryIcon from "./WorkshopCategoryIcon"

type WorkshopItemProps = {
  item: WorkshopType
}

const WorkshopItem = ({ item }: WorkshopItemProps) => {
  const { imageUrl, title, category, date, price } = item

  const dispatch = useAppDispatch()

  const handleAddToCart = () => {
    dispatch(showSidebar())
    dispatch(mountDrawer())
    dispatch(addToCart(item))
  }

  return (
    <Flex className={styles.item__box}>
      <div className={styles.item__graphics_container}>
        <span className={styles.item__image_container}>
          <Link to={Routes.WORKSHOP + item.id} aria-label="workshop-image-link">
            <img src={imageUrl} alt={title} aria-label="workshop-image" className={styles.item__image} />
          </Link>
        </span>
        <span className={styles.item__category_container}>
          <WorkshopCategoryIcon
            category={category}
            role="img"
            aria-label="workshop-category"
            name={category}
            className={styles.item__category_icon}
          />
        </span>
      </div>
      <Flex className={styles.item__details_container}>
        <Flex className={styles.item__datetime_container}>
          <CalendarIcon className={styles.item__datetime_icon} height="18" width="18" />
          <h6 className={styles.item__date} aria-label="workshop-date" aria-details={date}>
            {displayDate(date)}
          </h6>
          <ClockIcon className={styles.item__datetime_icon} height="18" width="18" />
          <h6 aria-label="workshop-time">{displayTime(date)}</h6>
        </Flex>
        <Flex>
          <Link to={Routes.WORKSHOP + item.id} aria-label="workshop-title-link">
            <h4 className={styles.item__title} aria-label="workshop-title">
              {title}
            </h4>
          </Link>
        </Flex>
        <Flex className={styles.item__price_container}>
          <h3 className={styles.item__price} aria-label="workshop-price">
            {monetize(price)}
          </h3>
          <h6 className={styles.item__currency}>EUR</h6>
          <PrimaryButton
            onClick={handleAddToCart}
            className={styles.item__button_icon}
            aria-label="workshop-button-icon"
          >
            <CartIcon height="32" width="32" />
          </PrimaryButton>
        </Flex>
        <Flex className={styles.item__button_container}>
          <PrimaryButton
            onClick={handleAddToCart}
            className={styles.item__button_text}
            aria-label="workshop-button-text"
          >
            <p className="bold">Add to Cart</p>
          </PrimaryButton>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default WorkshopItem
