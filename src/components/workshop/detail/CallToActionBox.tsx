import { EmptyCartIcon } from "assets/icons"
import clsx from "clsx"
import { PrimaryButton } from "components/common/button"
import { DropdownInput } from "components/common/input"
import { quantityItems } from "constants/data"
import { useAppDispatch, useAppSelector } from "hooks/redux"
import { Fragment, useEffect, useState } from "react"
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
  const totalClasses = clsx([styles.cta_box__total, "semi"])

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
    <Fragment>
      <div className={styles.cta_sticky__container}>
        <div>
          <div className={styles.cta_sticky__price_container}>
            <h3 className={styles.cta_sticky__price} aria-label="workshop-price">
              {monetize(price)}
            </h3>
            <h6 className={styles.cta_sticky__currency}>EUR</h6>
          </div>
        </div>
        <div className={styles.cta_sticky__action_container}>
          <DropdownInput
            items={quantityItems}
            value={quantityItems.find(item => quantityValue === item.value)}
            id="workshop-ticket-dropdown"
            placement="top"
            onChange={handleQuantityChange}
          />
          <PrimaryButton
            onClick={handleAddToCartClick}
            className={styles.cta_sticky__button_container}
            aria-label="workshop-button"
          >
            <p className="bold">Add to</p>
            <EmptyCartIcon />
          </PrimaryButton>
        </div>
      </div>
      <div className={styles.cta_box__container}>
        <h5>Buy Your Ticket</h5>
        <div className={styles.cta_box__price_container}>
          <h2 className={styles.cta_box__price} aria-label="workshop-price">
            {monetize(price)}
          </h2>
          <h5 className={styles.cta_box__currency}>EUR</h5>
        </div>
        <div className={styles.cta_box__action_container}>
          <DropdownInput
            items={quantityItems}
            value={quantityItems.find(item => quantityValue === item.value)}
            id="workshop-ticket-dropdown"
            placement="top"
            onChange={handleQuantityChange}
            ctaBox
          />
          <PrimaryButton
            onClick={handleAddToCartClick}
            className={styles.cta_box__button_container}
            aria-label="workshop-button"
          >
            <p className="bold">Add to Cart</p>
          </PrimaryButton>
        </div>
        <h6 className={totalClasses} aria-label="workshop-total">
          Subtotal: {monetize(price * parseInt(quantityValue))} EUR
        </h6>
      </div>
    </Fragment>
  )
}

export default CallToActionBox
