import { useGetCategoriesQuery } from "api/categories"
import { useGetWorkshopsQuery } from "api/workshops"
import Flex from "components/container/Flex"
import WorkshopFilter from "components/workshop/list/WorkshopFilter"
import WorkshopList from "components/workshop/list/WorkshopList"
import { useState } from "react"
import { sortByDateDesc } from "utils/array-utils"
import styles from "./Page.module.scss"

const HomePage = () => {
  const [limit, setLimit] = useState(9)
  const [category, setCategory] = useState("all")
  const { data: items } = useGetWorkshopsQuery({ limit, category })
  const { data: categories } = useGetCategoriesQuery(null)

  const handleSelectCategory = (text: string) => {
    setCategory(text)
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
