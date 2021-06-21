import { cleanup, render, RenderResult } from "@testing-library/react"
import { store } from "app/store"
import { Routes } from "constants/enums"
import { Provider } from "react-redux"
import { MemoryRouter, Route, RouteProps } from "react-router-dom"
import Navbar from "./Navbar"

describe("Layout", () => {
  let component: RenderResult
  let appLocation: RouteProps["location"]

  beforeEach(() => {
    component = render(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar />
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

  afterEach(cleanup)

  it("renders the navbar", () => {
    const navbar = component.getByRole("navigation")
    expect(navbar).toBeInTheDocument()
  })

  it("renders the logo", () => {
    const logo = component.getByTestId("logo")
    expect(logo).toBeInTheDocument()
  })

  it("redirects to homepage/workshop list when clicking the logo", () => {
    component.getByTestId("logo-link").click()
    expect(appLocation?.pathname).toBe(Routes.HOME)
  })

  it("renders the cart icon in the navbar", () => {
    const cart = component.getByTestId("navbar-cart-icon")
    expect(cart).toBeInTheDocument()
  })

  it("renders the item counter in the navbar", () => {
    const counter = component.getByTestId("navbar-cart-counter")
    expect(counter).toBeInTheDocument()
    expect(counter).toHaveTextContent(/cart/i)
  })

  it("opens cart drawer when clicking the cart", () => {
    component.getByTestId("cart-button").click()
    const sidebar = component.getByRole("complementary")
    expect(sidebar).toBeInTheDocument()
  })

  it("renders the cart icon in the cart drawer", () => {
    const cart = component.getByTestId("drawer-cart-icon")
    expect(cart).toBeInTheDocument()
  })

  it("renders the item counter in the cart drawer", () => {
    component.getByTestId("cart-button").click()
    const counter = component.getByTestId("drawer-cart-counter")
    expect(counter).toBeInTheDocument()
    expect(counter).toHaveTextContent(/workshop/i)
  })

  it.todo("changes the item counter depending on workshops added")
  it.todo("closes cart drawer when clicking the close button")
})
