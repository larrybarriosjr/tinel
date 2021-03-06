import { CloseIcon } from "assets/icons"
import clsx from "clsx"
import { FlatButton } from "components/common/button"
import Modal from "components/layout/Modal"
import styles from "./Checkout.module.scss"
import CheckoutForm from "./CheckoutForm"

type CheckoutModalProps = React.ComponentPropsWithoutRef<"dialog"> & {
  onClose: () => void
}

const CheckoutModal = ({ open, onClose, ...props }: CheckoutModalProps) => {
  const descriptionClasses = clsx([styles.modal__description, "semi"])

  return (
    <Modal open={open} {...props}>
      <div className={styles.modal__header_container}>
        <header className={styles.modal__header}>
          <h2>Checkout</h2>
          <h6 className={descriptionClasses}>Please fill out the checkout form below.</h6>
        </header>
        <FlatButton onClick={onClose} className={styles.modal__close_button}>
          <CloseIcon />
        </FlatButton>
      </div>
      <CheckoutForm />
    </Modal>
  )
}

export default CheckoutModal
