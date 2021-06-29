import { BrushIcon, CodeIcon, FlashIcon, LayoutIcon } from "assets/icons"
import clsx from "clsx"
import { WorkshopCategories } from "constants/enums"
import styles from "./Common.module.scss"

type CategoryIconProps = React.ComponentPropsWithoutRef<"svg"> & {
  category: string
  containerClassName?: string
}

const CategoryIcon = ({ category, containerClassName, ...props }: CategoryIconProps) => {
  const containerClasses = clsx([styles.category__container, containerClassName])

  const Icon = (iconProps: React.ComponentPropsWithoutRef<"svg">) => {
    switch (category) {
      case WorkshopCategories.DESIGN:
        return <BrushIcon {...iconProps} />
      case WorkshopCategories.FRONTEND:
        return <LayoutIcon {...iconProps} />
      case WorkshopCategories.BACKEND:
        return <CodeIcon {...iconProps} />
      case WorkshopCategories.MARKETING:
        return <FlashIcon {...iconProps} />
      default:
        return null
    }
  }

  return (
    <span className={containerClasses}>
      <Icon fill="white" {...props} />
    </span>
  )
}

export default CategoryIcon
