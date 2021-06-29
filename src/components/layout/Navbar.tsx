import { ReactComponent as EmptyCartIcon } from "assets/icons/empty-cart.svg"
import { ReactComponent as Logo } from "assets/logo.svg"
import CartDrawer from "components/cart/CartDrawer"
import { FlatButton } from "components/common/button"
import Flex from "components/container/Flex"
import { Routes } from "constants/enums"
import { useAppDispatch, useAppSelector } from "hooks/redux"
import { Link } from "react-router-dom"
import {
  toggleCheckoutModalDisplay,
  toggleCheckoutModalMounted,
  toggleDrawerDisplay,
  toggleDrawerMounted
} from "states/presentation"
import { pluralize } from "utils/text-utils"
import styles from "./Layout.module.scss"

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
        <Link to={Routes.HOME} data-testid="logo-link">
          <Logo className={styles.nav__logo} data-testid="logo" />
        </Link>
        <Flex className={styles.nav__cart_container}>
          <FlatButton data-testid="cart-button" onClick={handleShowDrawer}>
            <EmptyCartIcon data-testid="navbar-cart-icon" />
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
