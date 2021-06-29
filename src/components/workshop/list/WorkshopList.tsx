import { UnderlineButton } from "components/common/button"
import Flex from "components/container/Flex"
import Loading from "components/layout/Loading"
import { WorkshopType } from "types/api"
import WorkshopItem from "./WorkshopItem"
import styles from "./WorkshopList.module.scss"

type WorkshopListProps = {
  items: WorkshopType[]
  limit: number
  onLoadMore: () => void
  loading?: boolean
}

const WorkshopList = ({ items, limit, onLoadMore, loading }: WorkshopListProps) => {
  if (!items.length) return null

  return (
    <Flex className={styles.list__box}>
      <div className={styles.list__title_container}>
        <h2>Workshops</h2>
        <h6>
          <span className={styles.list__displayed}>Displayed:</span> {items.length}
        </h6>
      </div>
      <Flex className={styles.list__container}>
        {items.map(item => (
          <WorkshopItem key={item.id} item={item} />
        ))}
      </Flex>
      {limit <= items.length ? (
        <UnderlineButton
          onClick={onLoadMore}
          className={styles.list__load_more_button}
          aria-label="load-more-button"
        >
          <h5>Load More</h5>
        </UnderlineButton>
      ) : null}
      {loading ? <Loading /> : null}
    </Flex>
  )
}

export default WorkshopList
