import { fireEvent, render, screen } from "@testing-library/react"
import { renderHook } from "@testing-library/react-hooks"
import { persistor, store } from "app/store"
import { Routes } from "constants/enums"
import { useAppDispatch } from "hooks/redux"
import workshop from "mocks/workshops.json"
import { Provider } from "react-redux"
import { MemoryRouter, Route, RouteProps } from "react-router-dom"
import { PersistGate } from "redux-persist/integration/react"
import { addToCart, removeFromCart } from "states/cart"
import Navbar from "./Navbar"

describe("Layout", () => {
  let appLocation: RouteProps["location"]

  beforeEach(() => {
    render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
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
        </PersistGate>
      </Provider>
    )
  })

  it("renders the navbar", () => {
    const navbar = screen.getByRole("navigation")
    expect(navbar).toBeInTheDocument()
  })

  it("renders the logo", () => {
    const logo = screen.getByTestId("logo")
    expect(logo).toBeInTheDocument()
  })

  it("redirects to home page when clicking the logo", () => {
    fireEvent.click(screen.getByTestId("logo-link"))
    expect(appLocation?.pathname).toEqual(Routes.HOME)
  })

  it("renders the cart icon in the navbar", () => {
    const cart = screen.getByTestId("navbar-cart-icon")
    expect(cart).toBeInTheDocument()
  })

  it("renders the item counter in the navbar", () => {
    const counter = screen.getByTestId("navbar-cart-counter")
    expect(counter).toBeInTheDocument()
    expect(counter).toHaveTextContent(/cart/i)
  })

  it("opens cart drawer when clicking the cart", () => {
    fireEvent.click(screen.getByTestId("cart-button"))
    const sidebar = screen.getByRole("complementary")
    expect(sidebar).toBeInTheDocument()
  })

  it("changes the navbar item counter depending on workshops added", () => {
    const wrapper = ({ children }: { children: React.ReactChild }) => (
      <Provider store={store}>{children}</Provider>
    )
    const { result } = renderHook(() => useAppDispatch(), { wrapper })
    const dispatch = result.current

    const navbarCounter = screen.getByTestId("navbar-cart-counter")
    expect(navbarCounter).toHaveTextContent(/empty/i)

    dispatch(addToCart(workshop[0]))
    expect(navbarCounter).toHaveTextContent(/1/i)

    dispatch(addToCart(workshop[0]))
    expect(navbarCounter).toHaveTextContent(/2/i)

    dispatch(removeFromCart(workshop[0].id))
    expect(navbarCounter).toHaveTextContent(/empty/i)
  })

  it("renders the close button in the cart drawer", () => {
    fireEvent.click(screen.getByTestId("cart-button"))
    const close = screen.getByTestId("drawer-close-icon")
    expect(close).toBeInTheDocument()
  })

  it("closes cart drawer when clicking the close button", () => {
    fireEvent.click(screen.getByTestId("cart-button"))
    fireEvent.click(screen.getByTestId("drawer-close-button"))
    const sidebar = screen.getByRole("complementary")
    fireEvent.transitionEnd(sidebar)
    expect(sidebar).not.toBeInTheDocument()
  })
})
