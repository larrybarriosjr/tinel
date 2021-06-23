import { useGetWorkshopsQuery } from "api/workshops"
import Row from "containers/Row"
import WorkshopItem from "./WorkshopItem"
import styles from "./WorkshopList.module.scss"

const WorkshopList = () => {
  const { data } = useGetWorkshopsQuery({ page: 1, limit: 9 })

  return (
    <Row className={styles.row}>
      {data?.map(item => (
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
