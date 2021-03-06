import { TrashIcon } from "assets/icons"
import clsx from "clsx"
import { FlatButton } from "components/common/button"
import { DropdownInput } from "components/common/input"
import { quantityItems } from "constants/data"
import { useAppDispatch } from "hooks/redux"
import { removeFromCart, updateWorkshopQuantity } from "states/cart"
import { DropDownItemType } from "types/component"
import { monetize } from "utils/number-utils"
import styles from "./Cart.module.scss"

type CartItemProps = {
  id: number
  title: string
  imageUrl: string
  quantity: number
  price: number
}

const CartItem = ({ id, title, imageUrl, quantity, price }: CartItemProps) => {
  const titleClasses = clsx([styles.item__title, "cart"])
  const currencyClasses = clsx([styles.item__currency, "cart"])
  const priceClasses = clsx([styles.item__price, "cart"])

  const dispatch = useAppDispatch()

  const handleDelete = () => {
    dispatch(removeFromCart(id))
  }

  const handleSetQuantity = (value: DropDownItemType | null) => {
    if (!value) return
    dispatch(updateWorkshopQuantity({ id, quantity: parseInt(value.value) }))
  }

  return (
    <div className={styles.item__box}>
      <span className={styles.item__image_container}>
        <img src={imageUrl} alt={title} className={styles.item__image} />
      </span>
      <div className={styles.item__content_container}>
        <div className={styles.item__title_container}>
          <h4 className={titleClasses} data-testid="cart-item-title">
            {title}
          </h4>
          <FlatButton
            className={styles.item__delete_button}
            onClick={handleDelete}
            data-testid="cart-item-delete-button"
          >
            <TrashIcon />
          </FlatButton>
        </div>
        <div className={styles.item__price_container}>
          <DropdownInput
            items={quantityItems}
            value={quantityItems.find(item => quantity.toString() === item.value)}
            onChange={handleSetQuantity}
            id="cart-ticket-dropdown"
          />
          <h3 className={priceClasses} data-testid="cart-item-price">
            {monetize(price)}
          </h3>
          <h6 className={currencyClasses}>EUR</h6>
        </div>
      </div>
    </div>
  )
}

export default CartItem
