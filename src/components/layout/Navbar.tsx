import { ReactComponent as Logo } from "assets/logo.svg"
import { Routes } from "constants/enums"
import Row from "containers/Row"
import { Link } from "react-router-dom"
import styles from "./Navbar.module.scss"

type NavbarProps = React.ComponentPropsWithoutRef<"nav">

const Navbar = ({ ...props }: NavbarProps) => {
  return (
    <nav className={styles.nav} {...props}>
      <Row className={styles.row}>
        <Link to={Routes.HOME} data-testid="logo-link">
          <Logo className={styles.logo} data-testid="logo" />
        </Link>
      </Row>
    </nav>
  )
}

export default Navbar
