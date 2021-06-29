import { EmptyCartIcon } from "assets/icons"
import clsx from "clsx"
import { PrimaryButton } from "components/common/button"
import { DropdownInput } from "components/common/input"
import Flex from "components/container/Flex"
import { quantityItems } from "constants/data"
import { useAppDispatch, useAppSelector } from "hooks/redux"
import { useEffect, useState } from "react"
import { addToCart, updateWorkshopQuantity } from "states/cart"
import { toggleDrawerDisplay, toggleDrawerMounted } from "states/presentation"
import { WorkshopType } from "types/api"
import { DropDownItemType } from "types/component"
import { monetize } from "utils/number-utils"
import styles from "./WorkshopDetail.module.scss"

type CallToActionBoxProps = {
  item: WorkshopType
  quantity: number
}

const CallToActionBox = ({ item, quantity }: CallToActionBoxProps) => {
  const { id, price } = item
  const dispatch = useAppDispatch()
  const cartItems = useAppSelector(state => state.cartSlice.cartItems)
  const existingInCart = cartItems.find(item => item.id === id)
  const totalClasses = clsx([styles.cta__total, "semi"])

  const [quantityValue, setQuantityValue] = useState(quantity.toString())

  useEffect(() => {
    setQuantityValue(quantity.toString())
  }, [quantity])

  const handleQuantityChange = (value: DropDownItemType | null) => {
    if (!value) return
    setQuantityValue(value.value)
  }

  const handleAddToCartClick = () => {
    if (!existingInCart) dispatch(addToCart(item))
    dispatch(updateWorkshopQuantity({ id, quantity: parseInt(quantityValue) }))
    dispatch(toggleDrawerDisplay(true))
    dispatch(toggleDrawerMounted(true))
  }

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
          Subtotal: {monetize(price * parseInt(quantityValue))} EUR
        </h6>
      </div>
      <Flex>
        <DropdownInput
          items={quantityItems}
          value={quantityItems.find(item => quantityValue === item.value)}
          id="workshop-ticket-dropdown"
          placement="top"
          onChange={handleQuantityChange}
        />
        <PrimaryButton
          onClick={handleAddToCartClick}
          className={styles.cta__button_container}
          aria-label="workshop-button"
        >
          <p className="bold">Add to</p>
          <EmptyCartIcon />
        </PrimaryButton>
      </Flex>
    </Flex>
  )
}

export default CallToActionBox
