import Row from "containers/Row"
import { useAppSelector } from "hooks/redux"
import CartItem from "./CartItem"
import styles from "./CartList.module.scss"

const CartList = () => {
  const cartItems = useAppSelector(state => state.cartSlice.cartItems)
  const cartQuantity = useAppSelector(state => state.cartSlice.cartQuantity)
  const cartTotal = useAppSelector(state => state.cartSlice.cartTotal)

  return (
    <Row className={styles.row}>
      {cartQuantity
        ? cartItems.map(item => (
            <CartItem
              key={item.id}
              id={item.id}
              title={item.title}
              imageUrl={item.imageUrl}
              quantity={item.quantity}
              price={item.price}
            />
          ))
        : null}
      {cartQuantity ? (
        <Row className={styles.total_row}>
          <h6 className={styles.subtotal}>SUBTOTAL</h6>
          <Row className={styles.totalprice_row}>
            <h2 className={styles.price} data-testid="cart-total-price">
              {cartTotal},00
            </h2>
            <h4 className={styles.currency}>EUR</h4>
          </Row>
        </Row>
      ) : (
        <Row className={styles.empty_text}>
          <h4>Cart is Empty</h4>
        </Row>
      )}
    </Row>
  )
}

export default CartList
