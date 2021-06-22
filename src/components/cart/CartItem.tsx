import clsx from "clsx"
import Row from "containers/Row"
import styles from "./CartItem.module.scss"

type CartItemProps = {
  title: string
  imageUrl: string
}

const CartItem = ({ title, imageUrl }: CartItemProps) => {
  const titleClasses = clsx([styles.title, "cart"])

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
        </Row>
      </div>
    </div>
  )
}

export default CartItem
