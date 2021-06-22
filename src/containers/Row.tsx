import clsx from "clsx"
import styles from "./Row.module.scss"

type RowProps = React.ComponentPropsWithoutRef<"div">

const Row = ({ className, children, ...props }: RowProps) => {
  const classes = clsx([styles.row, className])

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}

export default Row
