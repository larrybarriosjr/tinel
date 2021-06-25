import clsx from "clsx"
import styles from "./Button.module.scss"

type UnderlineButtonProps = React.ComponentPropsWithoutRef<"button">

const UnderlineButton = ({ className, children, ...props }: UnderlineButtonProps) => {
  const classes = clsx([styles.underline, className])

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}

export default UnderlineButton
