import { SecondaryButton } from "components/common/button"
import Flex from "components/container/Flex"
import { useAppSelector } from "hooks/redux"
import { Fragment } from "react"
import { monetize } from "utils/number-utils"
import styles from "./Cart.module.scss"
import CartItem from "./CartItem"

type CartListProps = {
  onCheckout: () => void
}

const CartList = ({ onCheckout }: CartListProps) => {
  const cartItems = useAppSelector(state => state.cartSlice.cartItems)
  const cartQuantity = useAppSelector(state => state.cartSlice.cartQuantity)
  const cartTotal = useAppSelector(state => state.cartSlice.cartTotal)

  return (
    <Flex className={styles.list__container}>
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
          <Flex className={styles.list__subtotal_container}>
            <h6 className={styles.list__subtotal}>SUBTOTAL</h6>
            <Flex className={styles.list__price_container}>
              <h2 className={styles.list__price} data-testid="cart-total-price">
                {monetize(cartTotal)}
              </h2>
              <h4 className={styles.list__currency}>EUR</h4>
            </Flex>
          </Flex>
        </Fragment>
      ) : (
        <Flex className={styles.list__empty_text}>
          <h4>Cart is Empty</h4>
        </Flex>
      )}
      {cartQuantity ? (
        <Flex className={styles.list__checkout_button_container}>
          <SecondaryButton onClick={onCheckout} data-testid="cart-checkout-button">
            <h5>Checkout</h5>
          </SecondaryButton>
        </Flex>
      ) : null}
    </Flex>
  )
}

export default CartList
