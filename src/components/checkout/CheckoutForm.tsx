import PrimaryButton from "components/common/button/PrimaryButton"
import DateInput from "components/common/input/DateInput"
import SelectInput from "components/common/input/SelectInput"
import TextInput from "components/common/input/TextInput"
import { genderItems } from "constants/data"
import { initialCheckoutData } from "constants/form"
import { Form, Formik, FormikHelpers } from "formik"
import { CheckoutFormType } from "types/form"
import checkoutSchema from "validation/checkoutSchema"
import styles from "./Checkout.module.scss"

const CheckoutForm = () => {
  const handleSubmit = (values: CheckoutFormType, helpers: FormikHelpers<CheckoutFormType>) => {
    console.log(values)
    console.log(helpers)
  }

  return (
    <Formik initialValues={initialCheckoutData} validationSchema={checkoutSchema} onSubmit={handleSubmit}>
      <Form className={styles.form__container}>
        <TextInput name="firstName" label="First Name" placeholder="Type your first name here" />
        <TextInput name="lastName" label="Last Name" placeholder="Type your last name here" />
        <TextInput name="email" label="Email Address" placeholder="Type your email address here" />
        <DateInput name="birthday" label="Date of Birth" placeholder="DD.MM.YYYY" />
        <SelectInput name="gender" label="Gender" placeholder="Choose your gender" items={genderItems} />
        <TextInput name="address" label="Address" placeholder="Type your address here" />
        <TextInput name="zipCode" label="Zip Code" placeholder="eg. 21310" type="number" min="0" />
        <PrimaryButton className={styles.form__submit_button} type="submit">
          <h5>Checkout</h5>
        </PrimaryButton>
      </Form>
    </Formik>
  )
}

export default CheckoutForm
