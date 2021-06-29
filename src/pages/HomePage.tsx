import { useGetCategoriesQuery } from "api/categories"
import { useGetWorkshopsQuery } from "api/workshops"
import Flex from "components/container/Flex"
import WorkshopFilter from "components/workshop/list/WorkshopFilter"
import WorkshopList from "components/workshop/list/WorkshopList"
import { WorkshopCategories } from "constants/enums"
import { useAppDispatch, useAppSelector } from "hooks/redux"
import { useState } from "react"
import { selectFilter } from "states/workshop"
import { sortByDateDesc } from "utils/array-utils"
import styles from "./Page.module.scss"

const HomePage = () => {
  const dispatch = useAppDispatch()
  const [limit, setLimit] = useState(9)
  const category = useAppSelector(state => state.workshopSlice.filterSelected)
  const { data: items } = useGetWorkshopsQuery({ limit, category })
  const { data: categories } = useGetCategoriesQuery(null)

  const handleSelectCategory = (category: WorkshopCategories) => {
    dispatch(selectFilter(category))
  }

  const handleLoadMoreItem = () => {
    setLimit(limit => limit + 9)
  }

  if (!items) return null
  if (!categories) return null

  return (
    <Flex className={styles.home}>
      <WorkshopFilter categories={categories} onSelect={handleSelectCategory} selected={category} />
      <WorkshopList items={sortByDateDesc(items, "date")} limit={limit} onLoadMore={handleLoadMoreItem} />
    </Flex>
  )
}

export default HomePage
