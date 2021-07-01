import { useGetUserByIdQuery } from "api/users"
import { useGetWorkshopByIdQuery, useGetWorkshopsQuery } from "api/workshops"
import { PrimaryButton } from "components/common/button"
import Loading from "components/layout/Loading"
import SimilarWorkshops from "components/workshop/detail/SimilarWorkshops"
import WorkshopDetail from "components/workshop/detail/WorkshopDetail"
import { Routes } from "constants/enums"
import { useAppSelector } from "hooks/redux"
import { Fragment, useEffect } from "react"
import toast from "react-hot-toast"
import { Link, useParams } from "react-router-dom"
import styles from "./Page.module.scss"

const DetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const { data: items, isError: itemsIsError } = useGetWorkshopsQuery(null)
  const { data: item, isFetching, isLoading, isError: itemIsError } = useGetWorkshopByIdQuery(id)
  const { data: user, isError: userIsError } = useGetUserByIdQuery(item ? item.userId : 0)
  const cartItems = useAppSelector(state => state.cartSlice.cartItems)
  const workshopItem = cartItems.find(item => item.id.toString() === id)
  const quantity = workshopItem ? workshopItem.quantity : 1

  useEffect(() => {
    if (!itemsIsError) return
    toast.error("Cannot fetch similar workshop items.")
  }, [itemsIsError])

  useEffect(() => {
    if (!itemIsError || !userIsError) return
    toast.error("Cannot fetch workshop item details.")
  }, [itemIsError, userIsError])

  return (
    <div className={styles.detail}>
      {!item && (isFetching || isLoading) ? <Loading className={styles.detail__loading} /> : null}
      {!item && !isFetching && !isLoading ? (
        <div className={styles.detail__empty_container}>
          <h3 className={styles.home__empty}>No workshop found in this page.</h3>
          <Link to={Routes.HOME}>
            <PrimaryButton className={styles.detail__empty_button}>
              <h5>Back to Shop</h5>
            </PrimaryButton>
          </Link>
        </div>
      ) : null}
      {item && items ? (
        <Fragment>
          <WorkshopDetail item={item} user={user} quantity={quantity} />
          <SimilarWorkshops current={item} items={items} />
        </Fragment>
      ) : null}
    </div>
  )
}

export default DetailPage
