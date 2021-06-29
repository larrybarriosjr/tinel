import clsx from "clsx"
import styles from "./Layout.module.scss"

type LoadingProps = {
  className?: string
}

const Loading = ({ className }: LoadingProps) => {
  const classes = clsx([styles.loading__container, className])

  return (
    <div className={classes}>
      <span className={styles.loading__spinner} />
    </div>
  )
}

export default Loading
