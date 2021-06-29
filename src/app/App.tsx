import CheckoutModal from "components/checkout/CheckoutModal"
import Navbar from "components/layout/Navbar"
import { Routes } from "constants/enums"
import { useAppDispatch, useAppSelector } from "hooks/redux"
import DetailPage from "pages/DetailPage"
import HomePage from "pages/HomePage"
import { Fragment } from "react"
import { Route, Switch } from "react-router-dom"
import { hideCheckoutModal, unmountCheckoutModal } from "states/presentation"

function App() {
  const dispatch = useAppDispatch()
  const checkoutModalDisplay = useAppSelector(state => state.presentationSlice.checkoutModalDisplay)
  const checkoutModalMounted = useAppSelector(state => state.presentationSlice.checkoutModalMounted)

  const handleCloseModal = () => {
    dispatch(hideCheckoutModal())
  }

  const handleTransitionEnd = () => {
    dispatch(unmountCheckoutModal())
  }

  return (
    <Fragment>
      <Navbar />
      <Switch>
        <Route exact path={Routes.HOME} component={HomePage} />
        <Route path={Routes.WORKSHOP_PATH} component={DetailPage} />
      </Switch>
      {checkoutModalMounted ? (
        <CheckoutModal
          open={checkoutModalDisplay}
          onClose={handleCloseModal}
          onTransitionEnd={handleTransitionEnd}
        />
      ) : null}
    </Fragment>
  )
}

export default App
