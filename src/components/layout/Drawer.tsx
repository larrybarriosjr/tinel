import clsx from "clsx"
import { createPortal } from "react-dom"
import styles from "./Layout.module.scss"

type DrawerProps = React.ComponentPropsWithoutRef<"div"> & {
  open: boolean
}

const Drawer = ({ open, className, children, ...props }: DrawerProps) => {
  const classes = clsx([styles.drawer, { [styles.open]: open }, className])

  return createPortal(
    <aside className={classes} {...props}>
      {children}
    </aside>,
    document.body
  )
}

export default Drawer
