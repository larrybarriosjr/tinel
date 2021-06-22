import { cleanup, fireEvent, render, RenderResult } from "@testing-library/react"
import { renderHook } from "@testing-library/react-hooks"
import { persistor, store } from "app/store"
import { Routes } from "constants/enums"
import { useAppDispatch } from "hooks/redux"
import { Provider } from "react-redux"
import { MemoryRouter, Route, RouteProps } from "react-router-dom"
import { PersistGate } from "redux-persist/integration/react"
import { addToCart, removeFromCart } from "states/cart"
import { OrderProductsType } from "types/api"
import Navbar from "./Navbar"

const workshopItem: OrderProductsType = {
  category: "backend",
  date: "2020-01-26T13:51:50.417-07:00",
  desc: "The toughest part is probably to figure out which type of tests to write and how to test some specific logic in your app - but don't give up! Paula will present a few tips she learned along the way that will hopefully make your life easier. In this talk, you will hear about different test types and when to use them, real examples based on PHPUnit and Postman, followed by some tools for checking the test quality",
  id: 1,
  imageUrl: "https://pbs.twimg.com/media/EREoip3XsAEPDRp.jpg",
  price: 350,
  title: "When you get lost in API testing",
  userId: 1,
  quantity: 1
}

describe("Layout", () => {
  let component: RenderResult
  let appLocation: RouteProps["location"]

  beforeEach(() => {
    component = render(
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
    fireEvent.click(component.getByTestId("logo-link"))
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
    fireEvent.click(component.getByTestId("cart-button"))
    const sidebar = component.getByRole("complementary")
    expect(sidebar).toBeInTheDocument()
  })

  it("changes the navbar item counter depending on workshops added", () => {
    const wrapper = ({ children }: { children: React.ReactChild }) => (
      <Provider store={store}>{children}</Provider>
    )
    const { result } = renderHook(() => useAppDispatch(), { wrapper })
    const dispatch = result.current

    const navbarCounter = component.getByTestId("navbar-cart-counter")
    expect(navbarCounter).toHaveTextContent(/empty/i)

    dispatch(addToCart(workshopItem))
    expect(navbarCounter).toHaveTextContent(/1/i)

    dispatch(addToCart(workshopItem))
    expect(navbarCounter).toHaveTextContent(/2/i)

    dispatch(removeFromCart(1))
    expect(navbarCounter).toHaveTextContent(/empty/i)
  })

  it("renders the close button in the cart drawer", () => {
    fireEvent.click(component.getByTestId("cart-button"))
    const close = component.getByTestId("drawer-close-icon")
    expect(close).toBeInTheDocument()
  })

  it("closes cart drawer when clicking the close button", () => {
    fireEvent.click(component.getByTestId("cart-button"))
    fireEvent.click(component.getByTestId("drawer-close-button"))
    const sidebar = component.getByRole("complementary")
    fireEvent.transitionEnd(sidebar)
    expect(sidebar).not.toBeInTheDocument()
  })
})
