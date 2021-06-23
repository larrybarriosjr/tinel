import { ReactComponent as BrushIcon } from "assets/icons/brush.svg"
import { ReactComponent as CodeIcon } from "assets/icons/code.svg"
import { ReactComponent as FlashIcon } from "assets/icons/flash.svg"
import { ReactComponent as LayoutIcon } from "assets/icons/layout.svg"
import clsx from "clsx"
import { WorkshopCategories } from "constants/enums"
import styles from "./WorkshopCategory.module.scss"

type WorkshopCategoryProps = React.ComponentPropsWithoutRef<"span"> & {
  category: string
}

const WorkshopCategory = ({ category, className, ...props }: WorkshopCategoryProps) => {
  const classes = clsx([styles.box, className])

  const Icon = ({ ...props }: React.ComponentPropsWithoutRef<"svg">) => {
    switch (category) {
      case WorkshopCategories.DESIGN:
        return <BrushIcon {...props} />
      case WorkshopCategories.FRONTEND:
        return <LayoutIcon {...props} />
      case WorkshopCategories.BACKEND:
        return <CodeIcon {...props} />
      case WorkshopCategories.MARKETING:
        return <FlashIcon {...props} />
      default:
        return null
    }
  }

  return (
    <span className={classes} {...props}>
      <Icon name={category} className={styles.icon} />
    </span>
  )
}

export default WorkshopCategory
