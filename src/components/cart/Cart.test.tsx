import { fireEvent, render, screen } from "@testing-library/react"
import { renderHook } from "@testing-library/react-hooks"
import { store } from "app/store"
import { useAppDispatch, useAppSelector } from "hooks/redux"
import workshops from "mocks/workshops.json"
import { Provider } from "react-redux"
import { Action } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { addToCart, removeFromCart } from "states/cart"
import { RootState } from "types/redux"
import { monetize } from "utils/number-utils"
import CartDrawer from "./CartDrawer"

describe("Cart", () => {
  let dispatch: ThunkDispatch<RootState, undefined, Action>
  let totalPrice: number

  beforeEach(() => {
    const wrapper = ({ children }: { children: React.ReactChild }) => (
      <Provider store={store}>{children}</Provider>
    )
    const { result: appDispatch } = renderHook(() => useAppDispatch(), { wrapper })
    dispatch = appDispatch.current

    render(
      <Provider store={store}>
        <CartDrawer open={true} onClose={() => null} onTransitionEnd={() => null} />
      </Provider>
    )
  })

  afterEach(() => {
    dispatch(removeFromCart(workshops[0].id))
    dispatch(removeFromCart(workshops[1].id))
  })

  it("renders the workshop images in the cart drawer", () => {
    dispatch(addToCart(workshops[0]))
    dispatch(addToCart(workshops[1]))

    const images = screen.getAllByRole("img")
    images.forEach((image, idx) => {
      expect(image).toBeInTheDocument()

      if (idx + 1 === workshops[0].id) {
        expect(image).toHaveAttribute("src", workshops[0].imageUrl)
      }

      if (idx + 1 === workshops[1].id) {
        expect(image).toHaveAttribute("src", workshops[1].imageUrl)
      }
    })
  })

  it("renders the workshop titles in the cart drawer", () => {
    dispatch(addToCart(workshops[0]))
    dispatch(addToCart(workshops[1]))

    const titles = screen.getAllByTestId("cart-item-title")
    titles.forEach((title, idx) => {
      expect(title).toBeInTheDocument()

      if (idx + 1 === workshops[0].id) {
        expect(title.textContent).toEqual(workshops[0].title)
      }

      if (idx + 1 === workshops[1].id) {
        expect(title.textContent).toEqual(workshops[1].title)
      }
    })
  })

  it("renders the workshop delete buttons in the cart drawer", () => {
    dispatch(addToCart(workshops[0]))
    dispatch(addToCart(workshops[1]))

    const buttons = screen.getAllByTestId("cart-item-delete-button")
    buttons.forEach(button => {
      expect(button).toBeInTheDocument()
      fireEvent.click(button)
      expect(button).not.toBeInTheDocument()
    })
  })

  it("renders the workshop ticket count dropdowns in the cart drawer", () => {
    dispatch(addToCart(workshops[0]))
    dispatch(addToCart(workshops[1]))

    const dropdowns = document.querySelectorAll("#cart-ticket-dropdown")
    dropdowns.forEach(dropdown => {
      expect(dropdown).toBeInTheDocument()
    })
  })

  it("renders the workshop prices in the cart drawer", () => {
    dispatch(addToCart(workshops[0]))
    dispatch(addToCart(workshops[1]))

    const prices = screen.getAllByTestId("cart-item-price")
    prices.forEach((price, idx) => {
      expect(price).toBeInTheDocument()

      if (idx + 1 === workshops[0].id) {
        expect(price.textContent).toEqual(monetize(workshops[0].price))
      }

      if (idx + 1 === workshops[1].id) {
        expect(price.textContent).toEqual(monetize(workshops[1].price))
      }
    })
  })

  it("renders the cart total price in the cart drawer", () => {
    dispatch(addToCart(workshops[0]))
    dispatch(addToCart(workshops[1]))

    const wrapper = ({ children }: { children: React.ReactChild }) => (
      <Provider store={store}>{children}</Provider>
    )
    const { result: appSelector } = renderHook(() => useAppSelector(state => state.cartSlice.cartTotal), {
      wrapper
    })
    totalPrice = appSelector.current

    const price = screen.getByTestId("cart-total-price")
    expect(price).toBeInTheDocument()

    expect(price.textContent).toEqual(monetize(totalPrice))
  })

  it("renders the cart checkout button in the cart drawer", () => {
    let button = screen.queryByTestId("cart-checkout-button")
    expect(button).not.toBeInTheDocument()

    dispatch(addToCart(workshops[0]))
    dispatch(addToCart(workshops[1]))

    button = screen.getByTestId("cart-checkout-button")
    expect(button).toBeInTheDocument()
  })

  it("renders the cart icon in the cart drawer", () => {
    const cart = screen.getByTestId("drawer-cart-icon")
    expect(cart).toBeInTheDocument()
  })

  it("renders the item counter in the cart drawer", () => {
    const counter = screen.getByTestId("drawer-cart-counter")
    expect(counter).toBeInTheDocument()
    expect(counter).toHaveTextContent(/workshop/i)
  })

  it("changes the navbar item counter depending on workshops added", () => {
    const drawerCounter = screen.getByTestId("drawer-cart-counter")
    expect(drawerCounter).toHaveTextContent(/0/i)

    dispatch(addToCart(workshops[0]))
    expect(drawerCounter).toHaveTextContent(/1/i)

    dispatch(addToCart(workshops[1]))
    expect(drawerCounter).toHaveTextContent(/2/i)

    dispatch(removeFromCart(workshops[0].id))
    expect(drawerCounter).toHaveTextContent(/1/i)

    dispatch(removeFromCart(workshops[1].id))
    expect(drawerCounter).toHaveTextContent(/0/i)
  })
})
