import PrimaryButton from "components/common/button/PrimaryButton"
import Row from "containers/Row"
import { useAppSelector } from "hooks/redux"
import { Fragment } from "react"
import { monetize } from "utils/number-utils"
import styles from "./Cart.module.scss"
import CartItem from "./CartItem"

const CartList = () => {
  const cartItems = useAppSelector(state => state.cartSlice.cartItems)
  const cartQuantity = useAppSelector(state => state.cartSlice.cartQuantity)
  const cartTotal = useAppSelector(state => state.cartSlice.cartTotal)

  return (
    <Row className={styles.list__row}>
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
        <Fragment>
          <Row className={styles.list__subtotal_row}>
            <h6 className={styles.list__subtotal}>SUBTOTAL</h6>
            <Row className={styles.list__price_row}>
              <h2 className={styles.list__price} data-testid="cart-total-price">
                {monetize(cartTotal)}
              </h2>
              <h4 className={styles.list__currency}>EUR</h4>
            </Row>
          </Row>
        </Fragment>
      ) : (
        <Row className={styles.list__empty_text}>
          <h4>Cart is Empty</h4>
        </Row>
      )}
      {cartQuantity ? (
        <Row className={styles.list__checkout_button}>
          <PrimaryButton className="cart_drawer" data-testid="cart-checkout-button">
            Checkout
          </PrimaryButton>
        </Row>
      ) : null}
    </Row>
  )
}

export default CartList
