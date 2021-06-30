import { ChevronDownIcon } from "assets/icons"
import clsx from "clsx"
import { FlatButton } from "components/common/button"
import CategoryIcon from "components/common/CategoryIcon"
import Flex from "components/container/Flex"
import { Colors, WorkshopCategories } from "constants/enums"
import { useState } from "react"
import { capitalize } from "utils/text-utils"
import styles from "./WorkshopList.module.scss"

type WorkshopFilterProps = {
  categories: WorkshopCategories[]
  onSelect: (text: WorkshopCategories) => void
  selected: string
}

const WorkshopFilter = ({ categories, onSelect, selected }: WorkshopFilterProps) => {
  const allCategoryClasses = clsx([
    styles.filter__list_item_all,
    { [styles.selected]: selected === WorkshopCategories.ALL }
  ])
  const itemCategoryClasses = (category: string) =>
    clsx([styles.filter__list_item_category, { [styles.selected]: selected === category }])

  const [dropdownDisplay, setDropdownDisplay] = useState(false)

  const handleDropdownDisplay = () => {
    setDropdownDisplay(display => !display)
  }

  const handleSelectCategory = (category: WorkshopCategories) => {
    onSelect(category)
  }

  return (
    <FlatButton
      onClick={handleDropdownDisplay}
      className={styles.filter__button}
      aria-label="category-filter-button"
    >
      <Flex className={styles.filter__container}>
        <ChevronDownIcon
          fill={Colors.BLUE}
          transform={`scale(1, ${dropdownDisplay ? -1 : 1})`}
          role="combobox"
          aria-expanded={dropdownDisplay}
          aria-controls="category-list"
        />
        <h5>{capitalize(selected)}</h5>
        {dropdownDisplay ? (
          <ul id="category-list" aria-label="category-list" className={styles.filter__list_container}>
            <li
              tabIndex={0}
              role="option"
              aria-selected={selected === WorkshopCategories.ALL}
              className={allCategoryClasses}
              onClick={() => handleSelectCategory(WorkshopCategories.ALL)}
              onKeyDown={e => {
                if (e.key === "Enter" || e.key === "Space") handleSelectCategory(WorkshopCategories.ALL)
              }}
            >
              <h5>All</h5>
            </li>
            {[...categories].reverse().map((category, idx) => (
              <li
                key={idx}
                tabIndex={0}
                role="option"
                aria-selected={selected === category}
                className={itemCategoryClasses(category)}
                onClick={() => handleSelectCategory(category)}
                onKeyDown={e => {
                  if (e.key === "Enter" || e.key === " ") handleSelectCategory(category)
                }}
              >
                <CategoryIcon category={category} hasContainer={false} width="24" height="24" />
                <h5 aria-label="category-item">{capitalize(category)}</h5>
              </li>
            ))}
          </ul>
        ) : null}
      </Flex>
    </FlatButton>
  )
}

export default WorkshopFilter
