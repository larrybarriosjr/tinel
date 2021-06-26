import { ReactComponent as CartIcon } from "assets/icons/empty-cart.svg"
import clsx from "clsx"
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
  const totalClasses = clsx([styles.cta__total, "semi"])

  return (
    <Flex className={styles.cta__container}>
      <div>
        <Flex className={styles.cta__price_container}>
          <h3 className={styles.cta__price} aria-label="workshop-price">
            {monetize(price)}
          </h3>
          <h6 className={styles.cta__currency}>EUR</h6>
        </Flex>
        <h6 className={totalClasses} aria-label="workshop-total">
          Subtotal: {monetize(price * quantity)} EUR
        </h6>
      </div>
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
