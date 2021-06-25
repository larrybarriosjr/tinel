import { ReactComponent as BrushIcon } from "assets/icons/brush.svg"
import { ReactComponent as CodeIcon } from "assets/icons/code.svg"
import { ReactComponent as FlashIcon } from "assets/icons/flash.svg"
import { ReactComponent as LayoutIcon } from "assets/icons/layout.svg"
import { WorkshopCategories } from "constants/enums"

type WorkshopCategoryIconProps = React.ComponentPropsWithoutRef<"svg"> & {
  category: string
}

const WorkshopCategoryIcon = ({ category, ...props }: WorkshopCategoryIconProps) => {
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

export default WorkshopCategoryIcon
