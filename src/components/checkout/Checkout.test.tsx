import { render, screen } from "@testing-library/react"
import CheckoutModal from "./CheckoutModal"

describe("Checkout Form", () => {
  beforeEach(() => {
    render(<CheckoutModal open={true} onClose={() => null} />)
  })

  it("renders checkout form header", () => {
    const header = screen.getByRole("banner")
    expect(header).toBeInTheDocument()
    expect(header).toHaveTextContent(/checkout/i)
  })

  it.todo("renders all checkout form fields and checkout button")
  it.todo("renders all checkout form field placeholders")
  it.todo("validates all checkout form fields")
})
