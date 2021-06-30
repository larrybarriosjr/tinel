import { QueryStatus } from "@reduxjs/toolkit/dist/query"
import { useCreateOrderMutation } from "api/orders"
import { PrimaryButton } from "components/common/button"
import { CheckboxInput, DateInput, SelectInput, TextInput } from "components/common/input"
import Flex from "components/container/Flex"
import Loading from "components/layout/Loading"
import { genderItems } from "constants/data"
import { initialCheckoutData } from "constants/form"
import { Form, Formik, FormikHelpers } from "formik"
import { useAppDispatch, useAppSelector } from "hooks/redux"
import { useEffect } from "react"
import { clearCart } from "states/cart"
import { toggleCheckoutModalDisplay, toggleSuccessModalDisplay } from "states/presentation"
import { resetFilter } from "states/workshop"
import { CheckoutFormType } from "types/form"
import checkoutSchema from "validations/checkoutSchema"
import styles from "./Checkout.module.scss"
const CheckoutForm = () => {
  const dispatch = useAppDispatch()
  const cartItems = useAppSelector(state => state.cartSlice.cartItems)
  const cartTotal = useAppSelector(state => state.cartSlice.cartTotal)
  const [createOrder, { data, status, isLoading }] = useCreateOrderMutation()

  const handleSubmit = (values: CheckoutFormType, helpers: FormikHelpers<CheckoutFormType>) => {
    console.log(values)
    createOrder({ products: cartItems, total: cartTotal })
    helpers.resetForm()
  }

  useEffect(() => {
    if (status === QueryStatus.fulfilled) {
      dispatch(toggleCheckoutModalDisplay(false))
      dispatch(clearCart())
      dispatch(resetFilter())
      dispatch(toggleSuccessModalDisplay(true))
    }
  }, [status, data, dispatch])

  return isLoading ? (
    <Loading />
  ) : (
    <Formik initialValues={initialCheckoutData} validationSchema={checkoutSchema} onSubmit={handleSubmit}>
      <Form className={styles.form__container}>
        <TextInput name="firstName" label="First Name" placeholder="Type your first name here" />
        <TextInput name="lastName" label="Last Name" placeholder="Type your last name here" />
        <TextInput name="email" label="Email Address" placeholder="Type your email address here" />
        <Flex className={styles.form__two_cols}>
          <DateInput name="birthday" label="Date of Birth" placeholder="DD.MM.YYYY" />
          <SelectInput name="gender" label="Gender" placeholder="Choose your gender" items={genderItems} />
        </Flex>
        <TextInput name="address" label="Address" placeholder="Type your address here" />
        <TextInput name="zipCode" label="Zip Code" placeholder="eg. 21310" type="number" min="0" />
        <CheckboxInput name="isAgreed" label="I Agree" />
        <PrimaryButton className={styles.form__submit_button} type="submit">
          <h5>Checkout</h5>
        </PrimaryButton>
      </Form>
    </Formik>
  )
}

export default CheckoutForm
