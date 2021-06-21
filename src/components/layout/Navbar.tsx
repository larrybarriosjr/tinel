import { ReactComponent as CloseIcon } from "assets/icons/close.svg"
import { ReactComponent as EmptyCartIcon } from "assets/icons/empty-cart.svg"
import { ReactComponent as Logo } from "assets/logo.svg"
import { FlatButton } from "components/common/button"
import { Routes } from "constants/enums"
import Row from "containers/Row"
import { useAppDispatch, useAppSelector } from "hooks/redux"
import { useState } from "react"
import { Link } from "react-router-dom"
import { hideSidebar, showSidebar } from "states/presentation"
import Drawer from "./Drawer"
import styles from "./Navbar.module.scss"

type NavbarProps = React.ComponentPropsWithoutRef<"nav">

const Navbar = ({ ...props }: NavbarProps) => {
  const dispatch = useAppDispatch()
  const sidebarDisplay = useAppSelector(state => state.presentationSlice.sidebarDisplay)
  const [drawerState, setDrawerState] = useState(sidebarDisplay)

  const handleShowDrawer = () => {
    dispatch(showSidebar())
    setDrawerState(true)
  }

  const handleHideDrawer = () => {
    dispatch(hideSidebar())
  }

  const handleUnmountDrawer = () => {
    if (sidebarDisplay) return
    setDrawerState(false)
  }

  return (
    <nav className={styles.nav} {...props}>
      <Row className={styles.nav_row}>
        <Link to={Routes.HOME} data-testid="logo-link">
          <Logo className={styles.logo} data-testid="logo" />
        </Link>
        <Row className={styles.cart_row}>
          <FlatButton data-testid="cart-button" onClick={handleShowDrawer}>
            <EmptyCartIcon data-testid="navbar-cart-icon" />
          </FlatButton>
          <h6 className={styles.counter} data-testid="navbar-cart-counter">
            Cart is Empty
          </h6>
        </Row>
      </Row>
      {drawerState ? (
        <Drawer open={sidebarDisplay} onTransitionEnd={handleUnmountDrawer}>
          <Row className={styles.drawer_row}>
            <Row>
              <EmptyCartIcon data-testid="drawer-cart-icon" />
              <h5 className={styles.drawer_counter} data-testid="drawer-cart-counter">
                0 Workshop
              </h5>
            </Row>
            <Row>
              <FlatButton onClick={handleHideDrawer} data-testid="drawer-close-button">
                <CloseIcon data-testid="drawer-close-icon" />
              </FlatButton>
            </Row>
          </Row>
        </Drawer>
      ) : null}
    </nav>
  )
}

export default Navbar
