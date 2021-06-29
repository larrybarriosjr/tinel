import { genderItems } from "constants/data"
import { CheckoutFormType } from "types/form"
import { boolean, object, SchemaOf, string } from "yup"

const checkoutSchema: SchemaOf<CheckoutFormType> = object().shape({
  firstName: string().required("First Name is required"),
  lastName: string().required("Last Name is required"),
  email: string().email("Invalid email address").required("Email address is required"),
  birthday: string().required("Date of birth is required"),
  gender: string()
    .oneOf([...genderItems.map(item => item.value)], "Gender is required")
    .required("Gender is required"),
  address: string().required("Address is required"),
  zipCode: string().matches(/\d+/, "Zip code must be a valid number").required("Zip code is required"),
  isAgreed: boolean().required("You must agree before checking out")
})

export default checkoutSchema
