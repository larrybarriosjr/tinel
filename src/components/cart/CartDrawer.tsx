import { CloseIcon, EmptyCartIcon, FilledCartIcon } from "assets/icons"
import { FlatButton } from "components/common/button"
import Drawer from "components/layout/Drawer"
import { useAppSelector } from "hooks/redux"
import { pluralize } from "utils/text-utils"
import styles from "./Cart.module.scss"
import CartList from "./CartList"

type CartDrawerProps = {
  open: boolean
  onClose: () => void
  onTransitionEnd: () => void
  onCheckout: () => void
}

const CartDrawer = ({ open, onClose, onTransitionEnd, onCheckout }: CartDrawerProps) => {
  const cartQuantity = useAppSelector(state => state.cartSlice.cartQuantity)

  return (
    <Drawer open={open} onTransitionEnd={onTransitionEnd}>
      <div className={styles.drawer__header_container}>
        <div className={styles.drawer__cart_container}>
          {!cartQuantity ? (
            <EmptyCartIcon data-testid="drawer-cart-icon" />
          ) : (
            <FilledCartIcon data-testid="drawer-cart-icon" />
          )}
          <h5 className={styles.drawer__counter} data-testid="drawer-cart-counter">
            {cartQuantity} {pluralize("Workshop", cartQuantity)}
          </h5>
        </div>
        <FlatButton onClick={onClose} data-testid="drawer-close-button">
          <CloseIcon data-testid="drawer-close-icon" />
        </FlatButton>
      </div>
      <CartList onCheckout={onCheckout} />
    </Drawer>
  )
}

export default CartDrawer
