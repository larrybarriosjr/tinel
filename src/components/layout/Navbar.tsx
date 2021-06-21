import { ReactComponent as Logo } from "assets/logo.svg"
import Row from "containers/Row"
import styles from "./Navbar.module.scss"

type NavbarProps = React.ComponentPropsWithoutRef<"nav">

const Navbar = ({ ...props }: NavbarProps) => {
  return (
    <nav className={styles.nav} {...props}>
      <Row className={styles.row}>
        <Logo className={styles.logo} data-testid="logo" />
      </Row>
    </nav>
  )
}

export default Navbar
