import clsx from "clsx"
import { PrimaryButton } from "components/common/button"
import Flex from "components/container/Flex"
import Modal from "components/layout/Modal"
import { Routes } from "constants/enums"
import { useAppDispatch } from "hooks/redux"
import { useHistory } from "react-router-dom"
import { toggleSuccessModalDisplay } from "states/presentation"
import styles from "./Checkout.module.scss"

type SuccessModalProps = React.ComponentPropsWithoutRef<"dialog">

const SuccessModal = ({ open, className, ...props }: SuccessModalProps) => {
  const { push } = useHistory()
  const dispatch = useAppDispatch()
  const modalClasses = clsx([styles.modal__container, { [styles.open]: open }, className])
  const headerClasses = clsx([styles.modal__header_container, styles.success__header])
  const descriptionClasses = clsx([styles.modal__description, "semi"])

  const handleGoHome = () => {
    push(Routes.HOME)
    dispatch(toggleSuccessModalDisplay(false))
  }

  return (
    <Modal open={true} className={modalClasses} {...props}>
      <div className={styles.success__container}>
        <Flex className={headerClasses}>
          <header className={styles.modal__header}>
            <h2>Thank you!</h2>
            <h6 className={descriptionClasses}>
              Your checkout has been processed successfully. Please check your email for more details.
            </h6>
          </header>
        </Flex>
        <PrimaryButton onClick={handleGoHome} className={styles.success__button}>
          <h5>Back to Shop</h5>
        </PrimaryButton>
      </div>
    </Modal>
  )
}

export default SuccessModal
