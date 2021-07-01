import clsx from "clsx"
import styles from "./Button.module.scss"

type PrimaryButtonProps = React.ComponentPropsWithoutRef<"button">

const PrimaryButton = ({ className, children, ...props }: PrimaryButtonProps) => {
  const classes = clsx([
    styles.primary,
    { [styles.cart_drawer]: className?.includes("cart_drawer") },
    className
  ])

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}

export default PrimaryButton
