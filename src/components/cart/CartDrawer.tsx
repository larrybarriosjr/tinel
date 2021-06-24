import { ReactComponent as CloseIcon } from "assets/icons/close.svg"
import { ReactComponent as EmptyCartIcon } from "assets/icons/empty-cart.svg"
import { FlatButton } from "components/common/button"
import Flex from "components/container/Flex"
import Drawer from "components/layout/Drawer"
import { useAppSelector } from "hooks/redux"
import { pluralize } from "utils/text-utils"
import styles from "./Cart.module.scss"
import CartList from "./CartList"

type CartDrawerProps = {
  open: boolean
  onClose: () => void
  onTransitionEnd: () => void
}

const CartDrawer = ({ open, onClose, onTransitionEnd }: CartDrawerProps) => {
  const cartQuantity = useAppSelector(state => state.cartSlice.cartQuantity)

  return (
    <Drawer open={open} onTransitionEnd={onTransitionEnd}>
      <Flex className={styles.drawer__header_container}>
        <Flex className={styles.drawer__cart_container}>
          <EmptyCartIcon data-testid="drawer-cart-icon" />
          <h5 className={styles.drawer__counter} data-testid="drawer-cart-counter">
            {cartQuantity} {pluralize("Workshop", cartQuantity)}
          </h5>
        </Flex>
        <Flex>
          <FlatButton onClick={onClose} data-testid="drawer-close-button">
            <CloseIcon data-testid="drawer-close-icon" />
          </FlatButton>
        </Flex>
      </Flex>
      <CartList />
    </Drawer>
  )
}

export default CartDrawer
