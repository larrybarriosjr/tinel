import { ReactComponent as LogoImage } from "assets/logo.svg"
import { Routes } from "constants/enums"
import { Link } from "react-router-dom"
import styles from "./Layout.module.scss"

const Logo = () => {
  return (
    <Link to={Routes.HOME} data-testid="logo-link">
      <LogoImage className={styles.logo} data-testid="logo" />
    </Link>
  )
}

export default Logo
