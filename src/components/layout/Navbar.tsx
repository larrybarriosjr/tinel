import { ReactComponent as EmptyCart } from "assets/icons/empty-cart.svg"
import { ReactComponent as Logo } from "assets/logo.svg"
import { Routes } from "constants/enums"
import Row from "containers/Row"
import { Link } from "react-router-dom"
import styles from "./Navbar.module.scss"

type NavbarProps = React.ComponentPropsWithoutRef<"nav">

const Navbar = ({ ...props }: NavbarProps) => {
  return (
    <nav className={styles.nav} {...props}>
      <Row className={styles.nav_row}>
        <Link to={Routes.HOME} data-testid="logo-link">
          <Logo className={styles.logo} data-testid="logo" />
        </Link>
        <Row className={styles.cart_row}>
          <EmptyCart data-testid="cart-icon" />
          <h6 className={styles.counter} data-testid="cart-counter">
            Cart is Empty
          </h6>
        </Row>
      </Row>
    </nav>
  )
}

export default Navbar
