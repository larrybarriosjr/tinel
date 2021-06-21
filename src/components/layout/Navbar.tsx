import { ReactComponent as EmptyCart } from "assets/icons/empty-cart.svg"
import { ReactComponent as Logo } from "assets/logo.svg"
import { FlatButton } from "components/common/button"
import { Routes } from "constants/enums"
import Row from "containers/Row"
import { useAppDispatch, useAppSelector } from "hooks/redux"
import { useState } from "react"
import { Link } from "react-router-dom"
import { showSidebar } from "states/presentation"
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

  return (
    <nav className={styles.nav} {...props}>
      <Row className={styles.nav_row}>
        <Link to={Routes.HOME} data-testid="logo-link">
          <Logo className={styles.logo} data-testid="logo" />
        </Link>
        <Row className={styles.cart_row}>
          <FlatButton data-testid="cart-button" onClick={handleShowDrawer}>
          <EmptyCart data-testid="cart-icon" />
          </FlatButton>
          <h6 className={styles.counter} data-testid="cart-counter">
            Cart is Empty
          </h6>
        </Row>
      </Row>
      {drawerState ? <Drawer open={sidebarDisplay} /> : null}
    </nav>
  )
}

export default Navbar
