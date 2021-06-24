import { useGetWorkshopsQuery } from "api/workshops"
import WorkshopList from "components/workshop/WorkshopList"
import Row from "containers/Row"

const HomePage = () => {
  const { data } = useGetWorkshopsQuery({ page: 1, limit: 9 })

  if (!data) return null

  return (
    <Row>
      <WorkshopList items={data} />
    </Row>
  )
}

export default HomePage
