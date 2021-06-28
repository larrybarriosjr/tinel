import { render } from "@testing-library/react"
import CheckoutModal from "./CheckoutModal"

describe("Checkout Form", () => {
  beforeEach(() => {
    render(<CheckoutModal />)
  })

  it.todo("renders all checkout form fields and checkout button")
  it.todo("renders all checkout form field placeholders")
  it.todo("validates all checkout form fields")
})