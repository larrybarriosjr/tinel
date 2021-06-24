import clsx from "clsx"
import styles from "./Containers.module.scss"

type FlexProps = React.ComponentPropsWithoutRef<"div">

const Flex = ({ className, children, ...props }: FlexProps) => {
  const classes = clsx([styles.row, className])

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}

export default Flex
