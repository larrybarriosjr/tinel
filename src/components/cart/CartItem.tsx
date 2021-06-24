import { ReactComponent as TrashIcon } from "assets/icons/trash.svg"
import clsx from "clsx"
import { FlatButton } from "components/common/button"
import DropdownInput from "components/common/input/DropdownInput"
import Row from "containers/Row"
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

  const items = Array.from({ length: 11 }, (_, idx) => idx).map(id => ({
    label: id.toString(),
    value: id.toString()
  }))

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
      <div className={styles.item__content}>
        <Row className={styles.item__title_row}>
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
        </Row>
        <Row className={styles.item__price_row}>
          <DropdownInput
            items={items}
            value={items.find(item => quantity.toString() === item.value)}
            onChange={handleSetQuantity}
            id="cart-ticket-dropdown"
          />
          <h3 className={priceClasses} data-testid="cart-item-price">
            {monetize(price)}
          </h3>
          <h6 className={currencyClasses}>EUR</h6>
        </Row>
      </div>
    </div>
  )
}

export default CartItem
