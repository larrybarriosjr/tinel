import Flex from "components/container/Flex"
import { monetize } from "utils/number-utils"
import styles from "./WorkshopDetail.module.scss"

type CallToActionBoxProps = {
  price: number
}

const CallToActionBox = ({ price }: CallToActionBoxProps) => {
  return (
    <Flex className={styles.cta__container}>
      <h3 className={styles.cta__price} aria-label="workshop-price">
        {monetize(price)}
      </h3>
      <h6 className={styles.cta__currency}>EUR</h6>
    </Flex>
  )
}

export default CallToActionBox
