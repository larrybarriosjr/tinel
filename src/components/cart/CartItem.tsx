import { ReactComponent as TrashIcon } from "assets/icons/trash.svg"
import clsx from "clsx"
import { FlatButton } from "components/common/button"
import Row from "containers/Row"
import { useAppDispatch } from "hooks/redux"
import { removeFromCart } from "states/cart"
import styles from "./CartItem.module.scss"

type CartItemProps = {
  id: number
  title: string
  imageUrl: string
}

const CartItem = ({ id, title, imageUrl }: CartItemProps) => {
  const titleClasses = clsx([styles.title, "cart"])

  const dispatch = useAppDispatch()

  const handleDelete = () => {
    dispatch(removeFromCart(id))
  }

  return (
    <div className={styles.box}>
      <span className={styles.image_container}>
        <img src={imageUrl} alt={title} className={styles.image} />
      </span>
      <div className={styles.content}>
        <Row className={styles.title_row}>
          <h4 className={titleClasses} data-testid="cart-item-title">
            {title}
          </h4>
          <FlatButton
            className={styles.delete_button}
            onClick={handleDelete}
            data-testid="cart-item-delete-button"
          >
            <TrashIcon />
          </FlatButton>
        </Row>
      </div>
    </div>
  )
}

export default CartItem
