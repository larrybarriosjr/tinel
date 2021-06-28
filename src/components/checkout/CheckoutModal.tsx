import { ReactComponent as CloseIcon } from "assets/icons/close.svg"
import clsx from "clsx"
import { FlatButton } from "components/common/button"
import Modal from "components/common/Modal"
import styles from "./Checkout.module.scss"

type CheckoutModalProps = React.ComponentPropsWithoutRef<"dialog"> & {
  onClose: () => void
}

const CheckoutModal = ({ open, className, onClose, ...props }: CheckoutModalProps) => {
  const modalClasses = clsx([styles.modal__container, { [styles.open]: open }, className])

  return (
    <Modal open={true} className={modalClasses} {...props}>
      <FlatButton onClick={onClose} className={styles.modal__close_button}>
        <CloseIcon />
      </FlatButton>
    </Modal>
  )
}

export default CheckoutModal
