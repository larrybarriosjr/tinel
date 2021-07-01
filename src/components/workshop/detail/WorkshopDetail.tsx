import { ArrowLeftIcon, CalendarIcon, ClockIcon } from "assets/icons"
import { FlatButton } from "components/common/button"
import CategoryIcon from "components/common/CategoryIcon"
import { useHistory } from "react-router-dom"
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
  const { imageUrl, title, category, date, desc } = item

  const { goBack } = useHistory()

  return (
    <div className={styles.detail__container}>
      <FlatButton onClick={goBack} className={styles.detail__back_button}>
        <ArrowLeftIcon />
        <h6>Back</h6>
      </FlatButton>
      <div className={styles.detail__graphics_container}>
        <div className={styles.detail__image_container}>
          <img src={imageUrl} alt={title} className={styles.detail__image} aria-label="workshop-image" />
        </div>
        <CategoryIcon
          category={category}
          role="img"
          aria-label="workshop-category"
          name={category}
          containerClassName={styles.detail__graphics_category}
        />
      </div>
      <div className={styles.detail__details_container}>
        <div className={styles.detail__datetime_container}>
          <CategoryIcon
            category={category}
            role="img"
            aria-label="workshop-category"
            name={category}
            containerClassName={styles.detail__details_category}
          />
          <CalendarIcon className={styles.detail__datetime_icon} height="24" width="24" />
          <h6 className={styles.detail__date} aria-label="workshop-date" aria-details={date}>
            {displayDate(date)}
          </h6>
          <ClockIcon className={styles.detail__datetime_icon} height="24" width="24" />
          <h6 aria-label="workshop-time">{displayTime(date)}</h6>
        </div>
        <h1 className={styles.detail__title} aria-label="workshop-title">
          {title}
        </h1>
        {user ? (
          <div className={styles.detail__user_container}>
            <p className="bold">WITH</p>
            <h5 aria-label="workshop-user">{user.name}</h5>
          </div>
        ) : null}
        <p className={styles.detail__description} data-testid="workshop-description">
          {desc}
        </p>
      </div>
      <CallToActionBox item={item} quantity={quantity} />
    </div>
  )
}

export default WorkshopDetail
