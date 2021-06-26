import { ReactComponent as BackIcon } from "assets/icons/arrow-left.svg"
import { ReactComponent as CalendarIcon } from "assets/icons/calendar.svg"
import { ReactComponent as ClockIcon } from "assets/icons/clock.svg"
import CategoryIcon from "components/common/CategoryIcon"
import Flex from "components/container/Flex"
import { Routes } from "constants/enums"
import { Link } from "react-router-dom"
import { UserType, WorkshopType } from "types/api"
import { displayDate, displayTime } from "utils/text-utils"
import CallToActionBox from "./CallToActionBox"
import styles from "./WorkshopDetail.module.scss"

type WorkshopDetailProps = {
  item: WorkshopType
  user?: UserType
  quantity: number
}

const WorkshopDetail = ({ item, user, quantity }: WorkshopDetailProps) => {
  const { imageUrl, title, category, date, desc, price } = item

  return (
    <Flex className={styles.detail__container}>
      <Link to={Routes.HOME} className={styles.detail__back_button} aria-label="back-button">
        <BackIcon />
        <h6>Back</h6>
      </Link>
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
        {user ? (
          <Flex className={styles.detail__user_container}>
            <p className="bold">WITH</p>
            <h5 aria-label="workshop-user">{user.name}</h5>
          </Flex>
        ) : null}
        <p className={styles.detail__description} data-testid="workshop-description">
          {desc}
        </p>
      </div>
      <CallToActionBox price={price} quantity={quantity} />
    </Flex>
  )
}

export default WorkshopDetail
