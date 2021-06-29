import clsx from "clsx"
import { createPortal } from "react-dom"
import styles from "./Layout.module.scss"

type ModalProps = React.ComponentPropsWithoutRef<"dialog">

const Modal = ({ className, children, ...props }: ModalProps) => {
  const classes = clsx([styles.modal__container, className])

  return createPortal(
    <dialog className={classes} {...props}>
      {children}
    </dialog>,
    document.body
  )
}

export default Modal
