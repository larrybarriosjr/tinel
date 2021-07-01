import { act, fireEvent, render, screen } from "@testing-library/react"
import { store } from "app/store"
import { Routes } from "constants/enums"
import { Provider } from "react-redux"
import { MemoryRouter, Route, RouteProps } from "react-router-dom"
import CheckoutModal from "./CheckoutModal"
import SuccessModal from "./SuccessModal"

describe("Checkout Form", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <CheckoutModal open={true} onClose={() => null} />
      </Provider>
    )
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
    const address = screen.getByLabelText(/^address/i)
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

  it("renders all checkout form field placeholders", () => {
    const firstName = screen.getByLabelText(/first/i)
    const lastName = screen.getByLabelText(/last/i)
    const email = screen.getByLabelText(/email/i)
    const birthdate = screen.getByLabelText(/birth/i)
    const gender = screen.getByLabelText(/gender/i)
    const address = screen.getByLabelText(/^address/i)
    const zipCode = screen.getByLabelText(/zip/i)

    expect(firstName).toHaveAttribute("placeholder")
    expect(lastName).toHaveAttribute("placeholder")
    expect(email).toHaveAttribute("placeholder")
    expect(birthdate).toHaveAttribute("placeholder")
    expect(gender).toHaveAttribute("placeholder")
    expect(address).toHaveAttribute("placeholder")
    expect(zipCode).toHaveAttribute("placeholder")
  })

  it("validates all checkout form fields", async () => {
    const checkoutButton = screen.getByRole("button", { name: /checkout/i })

    await act(async () => {
      fireEvent.click(checkoutButton)
    })

    const firstNameError = screen.getByText("First Name is required")
    const lastNameError = screen.getByText("Last Name is required")
    const emailError = screen.getByText("Email Address is required")
    const birthdateError = screen.getByText("Date of Birth is required")
    const genderError = screen.getByText("Gender is required")
    const addressError = screen.getByText("Address is required")
    const zipCodeError = screen.getByText("Zip code is required")
    const agreeCheckboxError = screen.getByText("You must agree before checking out")

    expect(firstNameError).toBeInTheDocument()
    expect(lastNameError).toBeInTheDocument()
    expect(emailError).toBeInTheDocument()
    expect(birthdateError).toBeInTheDocument()
    expect(genderError).toBeInTheDocument()
    expect(addressError).toBeInTheDocument()
    expect(zipCodeError).toBeInTheDocument()
    expect(agreeCheckboxError).toBeInTheDocument()
  })
})

describe("Success Modal", () => {
  let appLocation: RouteProps["location"]

  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SuccessModal />
          <Route
            path="*"
            render={({ location }) => {
              appLocation = location
              return null
            }}
          />
        </MemoryRouter>
      </Provider>
    )
  })

  it("renders modal title", () => {
    const title = screen.getByText(/thank you/i)
    expect(title).toBeInTheDocument()
  })

  it("renders modal description", () => {
    const description = screen.getByText(/success/i)
    expect(description).toBeInTheDocument()
  })

  it("renders back to shop button", () => {
    const button = screen.getByText(/back to shop/i)
    expect(button).toBeInTheDocument()
  })

  it("redirects to home page when clicking on back to shop button", () => {
    const button = screen.getByText(/back to shop/i)
    fireEvent.click(button)
    expect(appLocation).toHaveProperty("pathname", Routes.HOME)
  })
})
