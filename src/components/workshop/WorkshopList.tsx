import Row from "containers/Row"
import React from "react"
import { WorkshopType } from "types/api"
import WorkshopItem from "./WorkshopItem"
import styles from "./WorkshopList.module.scss"

type WorkshopListProps = {
  items: WorkshopType[]
}

const WorkshopList = ({ items }: WorkshopListProps) => {
  return (
    <Row className={styles.row}>
      {items.map(item => (
        <WorkshopItem
          key={item.id}
          imageUrl={item.imageUrl}
          title={item.title}
          category={item.category}
          date={item.date}
          price={item.price}
        />
      ))}
    </Row>
  )
}

export default WorkshopList
