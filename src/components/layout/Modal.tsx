import clsx from "clsx"
import { createPortal } from "react-dom"
import styles from "./Layout.module.scss"

type ModalProps = React.ComponentPropsWithoutRef<"dialog">

const Modal = ({ open, className, children, ...props }: ModalProps) => {
  const classes = clsx([styles.modal__element, { [styles.open]: open }, className])

  return createPortal(
    <div className={styles.modal__container}>
      <dialog open={true} className={classes} {...props}>
        {children}
      </dialog>
    </div>,
    document.body
  )
}

export default Modal
