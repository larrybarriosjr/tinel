import { EmptyCartIcon, FilledCartIcon } from "assets/icons"
import CartDrawer from "components/cart/CartDrawer"
import { FlatButton } from "components/common/button"
import Flex from "components/container/Flex"
import { useAppDispatch, useAppSelector } from "hooks/redux"
import {
  toggleCheckoutModalDisplay,
  toggleCheckoutModalMounted,
  toggleDrawerDisplay,
  toggleDrawerMounted
} from "states/presentation"
import { pluralize } from "utils/text-utils"
import styles from "./Layout.module.scss"
import Logo from "./Logo"

type NavbarProps = React.ComponentPropsWithoutRef<"nav">

const Navbar = ({ ...props }: NavbarProps) => {
  const dispatch = useAppDispatch()
  const drawerDisplay = useAppSelector(state => state.presentationSlice.drawerDisplay)
  const drawerMounted = useAppSelector(state => state.presentationSlice.drawerMounted)
  const checkoutModalDisplay = useAppSelector(state => state.presentationSlice.checkoutModalDisplay)
  const cartQuantity = useAppSelector(state => state.cartSlice.cartQuantity)

  const handleShowDrawer = () => {
    dispatch(toggleDrawerDisplay(true))
    dispatch(toggleDrawerMounted(true))
  }

  const handleHideDrawer = () => {
    dispatch(toggleDrawerDisplay(false))
  }

  const handleUnmountDrawer = () => {
    if (drawerDisplay) return
    dispatch(toggleDrawerMounted(false))
    if (checkoutModalDisplay) {
      dispatch(toggleCheckoutModalMounted(true))
    }
  }

  const handleCheckout = () => {
    dispatch(toggleDrawerDisplay(false))
    dispatch(toggleCheckoutModalDisplay(true))
  }

  return (
    <nav className={styles.nav} {...props}>
      <Flex className={styles.nav__container}>
        <Logo />
        <Flex className={styles.nav__cart_container}>
          <FlatButton data-testid="cart-button" onClick={handleShowDrawer}>
            {!cartQuantity ? (
              <EmptyCartIcon data-testid="navbar-cart-icon" />
            ) : (
              <FilledCartIcon data-testid="navbar-cart-icon" />
            )}
          </FlatButton>
          <h6 className={styles.nav__cart_counter} data-testid="navbar-cart-counter">
            {cartQuantity
              ? `${cartQuantity} ${pluralize("Workshop", cartQuantity)} in Cart`
              : "Cart is Empty"}
          </h6>
        </Flex>
      </Flex>
      {drawerMounted ? (
        <CartDrawer
          open={drawerDisplay}
          onClose={handleHideDrawer}
          onTransitionEnd={handleUnmountDrawer}
          onCheckout={handleCheckout}
        />
      ) : null}
    </nav>
  )
}

export default Navbar
