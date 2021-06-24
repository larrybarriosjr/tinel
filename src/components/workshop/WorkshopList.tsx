import Flex from "components/container/Flex"
import React from "react"
import { WorkshopType } from "types/api"
import styles from "./Workshop.module.scss"
import WorkshopItem from "./WorkshopItem"

type WorkshopListProps = {
  items: WorkshopType[]
}

const WorkshopList = ({ items }: WorkshopListProps) => {
  return (
    <Flex className={styles.list__container}>
      {items.map(item => (
        <WorkshopItem key={item.id} item={item} />
      ))}
    </Flex>
  )
}

export default WorkshopList
