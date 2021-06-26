import { ReactComponent as CartIcon } from "assets/icons/empty-cart.svg"
import PrimaryButton from "components/common/button/PrimaryButton"
import DropdownInput from "components/common/input/DropdownInput"
import Flex from "components/container/Flex"
import { quantityItems } from "constants/data"
import { monetize } from "utils/number-utils"
import styles from "./WorkshopDetail.module.scss"

type CallToActionBoxProps = {
  price: number
  quantity: number
}

const CallToActionBox = ({ price, quantity }: CallToActionBoxProps) => {
  return (
    <Flex className={styles.cta__container}>
      <Flex className={styles.cta__price_container}>
        <h3 className={styles.cta__price} aria-label="workshop-price">
          {monetize(price)}
        </h3>
        <h6 className={styles.cta__currency}>EUR</h6>
      </Flex>
      <Flex>
        <DropdownInput
          items={quantityItems}
          value={quantityItems.find(item => quantity.toString() === item.value)}
          id="workshop-ticket-dropdown"
        />
        <PrimaryButton className={styles.cta__button_container} aria-label="workshop-button">
          <p className="bold">Add to</p>
          <CartIcon />
        </PrimaryButton>
      </Flex>
    </Flex>
  )
}

export default CallToActionBox
