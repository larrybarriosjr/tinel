import { ReactComponent as EmptyCartIcon } from "assets/icons/empty-cart.svg"
import { ReactComponent as Logo } from "assets/logo.svg"
import CartDrawer from "components/cart/CartDrawer"
import { FlatButton } from "components/common/button"
import { Routes } from "constants/enums"
import Row from "containers/Row"
import { useAppDispatch, useAppSelector } from "hooks/redux"
import { useState } from "react"
import { Link } from "react-router-dom"
import { hideSidebar, showSidebar } from "states/presentation"
import { pluralize } from "utils/text-utils"
import styles from "./Layout.module.scss"

type NavbarProps = React.ComponentPropsWithoutRef<"nav">

const Navbar = ({ ...props }: NavbarProps) => {
  const dispatch = useAppDispatch()
  const drawerDisplay = useAppSelector(state => state.presentationSlice.drawerDisplay)
  const cartQuantity = useAppSelector(state => state.cartSlice.cartQuantity)

  const [drawerMounted, setDrawerMounted] = useState(drawerDisplay)

  const handleShowDrawer = () => {
    dispatch(showSidebar())
    setDrawerMounted(true)
  }

  const handleHideDrawer = () => {
    dispatch(hideSidebar())
  }

  const handleUnmountDrawer = () => {
    if (drawerDisplay) return
    setDrawerMounted(false)
  }

  return (
    <nav className={styles.nav} {...props}>
      <Row className={styles.nav__row}>
        <Link to={Routes.HOME} data-testid="logo-link">
          <Logo className={styles.nav__logo} data-testid="logo" />
        </Link>
        <Row className={styles.nav__cart_row}>
          <FlatButton data-testid="cart-button" onClick={handleShowDrawer}>
            <EmptyCartIcon data-testid="navbar-cart-icon" />
          </FlatButton>
          <h6 className={styles.nav__cart_counter} data-testid="navbar-cart-counter">
            {cartQuantity
              ? `${cartQuantity} ${pluralize("Workshop", cartQuantity)} in Cart`
              : "Cart is Empty"}
          </h6>
        </Row>
      </Row>
      {drawerMounted ? (
        <CartDrawer open={drawerDisplay} onClose={handleHideDrawer} onTransitionEnd={handleUnmountDrawer} />
      ) : null}
    </nav>
  )
}

export default Navbar
