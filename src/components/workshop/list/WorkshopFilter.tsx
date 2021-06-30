import { ChevronDownIcon } from "assets/icons"
import clsx from "clsx"
import { FlatButton } from "components/common/button"
import CategoryIcon from "components/common/CategoryIcon"
import { Colors, WorkshopCategories } from "constants/enums"
import { Fragment, useState } from "react"
import { capitalize } from "utils/text-utils"
import styles from "./WorkshopList.module.scss"

type WorkshopFilterProps = {
  categories: WorkshopCategories[]
  onSelect: (text: WorkshopCategories) => void
  selected: string
}

const WorkshopFilter = ({ categories, onSelect, selected }: WorkshopFilterProps) => {
  const allCategoryButtonClasses = clsx([
    styles.filter_button__list_item_all,
    { [styles.selected]: selected === WorkshopCategories.ALL }
  ])
  const allCategorySidebarClasses = clsx([
    styles.filter_sidebar__list_item_all,
    { [styles.selected]: selected === WorkshopCategories.ALL }
  ])
  const itemCategoryButtonClasses = (category: string) =>
    clsx([styles.filter_button__list_item_category, { [styles.selected]: selected === category }])
  const itemCategorySidebarClasses = (category: string) =>
    clsx([styles.filter_sidebar__list_item_category, { [styles.selected]: selected === category }])

  const [dropdownDisplay, setDropdownDisplay] = useState(false)

  const handleDropdownDisplay = () => {
    setDropdownDisplay(display => !display)
  }

  const handleSelectCategory = (category: WorkshopCategories) => {
    onSelect(category)
  }

  return (
    <Fragment>
      <FlatButton
        onClick={handleDropdownDisplay}
        className={styles.filter_button}
        aria-label="category-filter-button"
      >
        <div className={styles.filter_button__container}>
          <ChevronDownIcon
            fill={Colors.BLUE}
            transform={`scale(1, ${dropdownDisplay ? -1 : 1})`}
            role="combobox"
            aria-expanded={dropdownDisplay}
            aria-controls="category-list"
          />
          <h5>{capitalize(selected)}</h5>
          {dropdownDisplay ? (
            <ul
              id="category-list"
              aria-label="category-list"
              className={styles.filter_button__list_container}
            >
              <li
                tabIndex={0}
                role="option"
                aria-selected={selected === WorkshopCategories.ALL}
                className={allCategoryButtonClasses}
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
                  className={itemCategoryButtonClasses(category)}
                  onClick={() => handleSelectCategory(category)}
                  onKeyDown={e => {
                    if (e.key === "Enter" || e.key === " ") handleSelectCategory(category)
                  }}
                >
                  <CategoryIcon
                    category={category}
                    hasContainer={false}
                    fill={selected === category ? "var(--blue)" : undefined}
                    width="24"
                    height="24"
                  />
                  <h5 aria-label="category-item">{capitalize(category)}</h5>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </FlatButton>
      <div className={styles.filter_sidebar}>
        <h6 className={styles.filter_sidebar__label}>Filter by category:</h6>
        <ul id="category-list" aria-label="category-list" className={styles.filter_sidebar__list_container}>
          <li
            tabIndex={0}
            role="option"
            aria-selected={selected === WorkshopCategories.ALL}
            className={allCategorySidebarClasses}
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
              className={itemCategorySidebarClasses(category)}
              onClick={() => handleSelectCategory(category)}
              onKeyDown={e => {
                if (e.key === "Enter" || e.key === " ") handleSelectCategory(category)
              }}
            >
              <CategoryIcon
                category={category}
                hasContainer={false}
                fill={selected === category ? "var(--blue)" : undefined}
                width="24"
                height="24"
              />
              <h5 aria-label="category-item">{capitalize(category)}</h5>
            </li>
          ))}
        </ul>
      </div>
    </Fragment>
  )
}

export default WorkshopFilter
