import Row from "containers/Row"
import { useAppSelector } from "hooks/redux"
import CartItem from "./CartItem"
import styles from "./CartList.module.scss"

const CartList = () => {
  const cartItems = useAppSelector(state => state.cartSlice.cartItems)
  const cartQuantity = useAppSelector(state => state.cartSlice.cartQuantity)

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
    </Row>
  )
}

export default CartList
