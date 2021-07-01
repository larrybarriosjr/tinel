import clsx from "clsx"
import styles from "./Button.module.scss"

type FlatButtonProps = React.ComponentPropsWithoutRef<"button">

const FlatButton = ({ className, children, ...props }: FlatButtonProps) => {
  const classes = clsx([styles.flat, className])

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}

export default FlatButton
