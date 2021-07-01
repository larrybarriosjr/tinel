import clsx from "clsx"
import styles from "./Button.module.scss"

type SecondaryButtonProps = React.ComponentPropsWithoutRef<"button">

const SecondaryButton = ({ className, children, ...props }: SecondaryButtonProps) => {
  const classes = clsx([styles.secondary, className])

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}

export default SecondaryButton
