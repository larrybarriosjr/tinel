import CheckoutModal from "components/checkout/CheckoutModal"
import SuccessModal from "components/checkout/SuccessModal"
import Footer from "components/layout/Footer"
import Navbar from "components/layout/Navbar"
import { Routes } from "constants/enums"
import { useAppDispatch, useAppSelector } from "hooks/redux"
import DetailPage from "pages/DetailPage"
import HomePage from "pages/HomePage"
import { Fragment } from "react"
import { Toaster } from "react-hot-toast"
import { Route, Switch } from "react-router-dom"
import {
  toggleCheckoutModalDisplay,
  toggleCheckoutModalMounted,
  toggleSuccessModalMounted
} from "states/presentation"
import styles from "./App.module.scss"

function App() {
  const dispatch = useAppDispatch()
  const checkoutModalDisplay = useAppSelector(state => state.presentationSlice.checkoutModalDisplay)
  const checkoutModalMounted = useAppSelector(state => state.presentationSlice.checkoutModalMounted)
  const successModalDisplay = useAppSelector(state => state.presentationSlice.successModalDisplay)
  const successModalMounted = useAppSelector(state => state.presentationSlice.successModalMounted)

  const handleCloseModal = () => {
    dispatch(toggleCheckoutModalDisplay(false))
  }

  const handleCheckoutTransitionEnd = () => {
    if (checkoutModalDisplay) return
    dispatch(toggleCheckoutModalMounted(false))
    if (successModalDisplay) {
      dispatch(toggleSuccessModalMounted(true))
    }
  }

  const handleSuccessTransitionEnd = () => {
    if (successModalDisplay) return
    dispatch(toggleSuccessModalMounted(false))
  }

  return (
    <Fragment>
      {/* Toast */}
      <Toaster
        position="bottom-center"
        toastOptions={{ style: { color: "white", background: "var(--red)" } }}
      />

      {/* Content */}
      <Navbar />
      <main className={styles.main}>
        <Switch>
          <Route exact path={Routes.HOME} component={HomePage} />
          <Route path={Routes.WORKSHOP_PATH} component={DetailPage} />
        </Switch>
      </main>
      <Footer />

      {/* Checkout Modal */}
      {checkoutModalMounted ? (
        <CheckoutModal
          open={checkoutModalDisplay}
          onClose={handleCloseModal}
          onTransitionEnd={handleCheckoutTransitionEnd}
        />
      ) : null}

      {/* Success Modal */}
      {successModalMounted ? (
        <SuccessModal open={successModalDisplay} onTransitionEnd={handleSuccessTransitionEnd} />
      ) : null}
    </Fragment>
  )
}

export default App
