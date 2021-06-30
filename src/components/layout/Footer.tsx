import clsx from "clsx"
import { Routes } from "constants/enums"
import { matchPath, useLocation } from "react-router-dom"
import styles from "./Layout.module.scss"

const Footer = () => {
  const { pathname } = useLocation()

  const classes = clsx([
    styles.footer__container,
    { [styles.footer__detail]: matchPath(pathname, Routes.WORKSHOP_PATH) }
  ])

  return (
    <footer className={classes}>
      <h6 className="semi">&copy; TINEL Meetup 2020.</h6>
    </footer>
  )
}

export default Footer
