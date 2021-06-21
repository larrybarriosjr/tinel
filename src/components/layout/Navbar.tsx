import styles from "./Navbar.module.scss"

type NavbarProps = React.ComponentPropsWithoutRef<"nav">

const Navbar = ({ ...props }: NavbarProps) => {
  return <nav className={styles.nav} {...props}></nav>
}

export default Navbar
