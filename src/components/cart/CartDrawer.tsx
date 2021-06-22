import { ReactComponent as CloseIcon } from "assets/icons/close.svg"
import { ReactComponent as EmptyCartIcon } from "assets/icons/empty-cart.svg"
import { FlatButton } from "components/common/button"
import Drawer from "components/layout/Drawer"
import Row from "containers/Row"
import { useAppSelector } from "hooks/redux"
import { pluralize } from "utils/text-utils"
import styles from "./CartDrawer.module.scss"

type CartDrawerProps = {
  open: boolean
  onClose: () => void
  onTransitionEnd: () => void
}

const CartDrawer = ({ open, onClose, onTransitionEnd }: CartDrawerProps) => {
  const cartQuantity = useAppSelector(state => state.cartSlice.cartQuantity)

  return (
    <Drawer open={open} onTransitionEnd={onTransitionEnd}>
      <Row className={styles.row}>
        <Row>
          <EmptyCartIcon data-testid="drawer-cart-icon" />
          <h5 className={styles.counter} data-testid="drawer-cart-counter">
            {cartQuantity} {pluralize("Workshop", cartQuantity)}
          </h5>
        </Row>
        <Row>
          <FlatButton onClick={onClose} data-testid="drawer-close-button">
            <CloseIcon data-testid="drawer-close-icon" />
          </FlatButton>
        </Row>
      </Row>
    </Drawer>
  )
}

export default CartDrawer
