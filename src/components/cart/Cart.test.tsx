import { cleanup, render, RenderResult } from "@testing-library/react"
import { renderHook } from "@testing-library/react-hooks"
import { store } from "app/store"
import { useAppDispatch } from "hooks/redux"
import { Provider } from "react-redux"
import { addToCart, removeFromCart } from "states/cart"
import { OrderProductsType } from "types/api"
import CartDrawer from "./CartDrawer"

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

describe("Cart", () => {
  let component: RenderResult

  beforeEach(() => {
    component = render(
      <Provider store={store}>
        <CartDrawer />
      </Provider>
    )
  })

  afterEach(cleanup)

  it.todo("renders the workshop images")
  it.todo("renders the workshop titles")
  it.todo("renders the workshop ticket count dropdowns")
  it.todo("renders the workshop prices")
  it.todo("renders the cart total price")
  it.todo("renders the cart checkout button")

  it("renders the cart icon in the cart drawer", () => {
    const cart = component.getByTestId("drawer-cart-icon")
    expect(cart).toBeInTheDocument()
  })

  it("renders the item counter in the cart drawer", () => {
    const counter = component.getByTestId("drawer-cart-counter")
    expect(counter).toBeInTheDocument()
    expect(counter).toHaveTextContent(/workshop/i)
  })

  it("changes the navbar item counter depending on workshops added", () => {
    const wrapper = ({ children }: { children: React.ReactChild }) => (
      <Provider store={store}>{children}</Provider>
    )
    const { result } = renderHook(() => useAppDispatch(), { wrapper })
    const dispatch = result.current

    const drawerCounter = component.getByTestId("drawer-cart-counter")
    expect(drawerCounter).toHaveTextContent(/0/i)

    dispatch(addToCart(workshopItem))
    expect(drawerCounter).toHaveTextContent(/1/i)

    dispatch(addToCart(workshopItem))
    expect(drawerCounter).toHaveTextContent(/2/i)

    dispatch(removeFromCart(1))
    expect(drawerCounter).toHaveTextContent(/0/i)
  })
})
