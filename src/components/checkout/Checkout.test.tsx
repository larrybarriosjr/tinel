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

  it("renders all checkout form fields and checkout button", () => {
    const firstName = screen.getByLabelText(/first/i)
    const lastName = screen.getByLabelText(/last/i)
    const email = screen.getByLabelText(/email/i)
    const birthdate = screen.getByLabelText(/birth/i)
    const gender = screen.getByLabelText(/gender/i)
    const address = screen.getByLabelText(/address/i)
    const zipCode = screen.getByLabelText(/zip/i)
    const agreeCheckbox = screen.getByLabelText(/agree/i)
    const checkoutButton = screen.getByRole("button", { name: /checkout/i })

    expect(firstName).toBeInTheDocument()
    expect(lastName).toBeInTheDocument()
    expect(email).toBeInTheDocument()
    expect(birthdate).toBeInTheDocument()
    expect(gender).toBeInTheDocument()
    expect(address).toBeInTheDocument()
    expect(zipCode).toBeInTheDocument()
    expect(agreeCheckbox).toBeInTheDocument()
    expect(checkoutButton).toBeInTheDocument()
  })

  it.todo("renders all checkout form field placeholders")
  it.todo("validates all checkout form fields")
})
