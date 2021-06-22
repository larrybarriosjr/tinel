import { cleanup, fireEvent, render, RenderResult } from "@testing-library/react"
import { renderHook } from "@testing-library/react-hooks"
import { store } from "app/store"
import { useAppDispatch, useAppSelector } from "hooks/redux"
import { Provider } from "react-redux"
import { Action } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { addToCart, removeFromCart } from "states/cart"
import { OrderProductsType } from "types/api"
import { RootState } from "types/redux"
import CartDrawer from "./CartDrawer"

const workshopItem1: OrderProductsType = {
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

const workshopItem2: OrderProductsType = {
  category: "marketing",
  date: "2019-12-26T13:51:50.417-07:00",
  desc: "Aleksandar Ašković aka Kojot is one of the pioneers when it comes to regional YouTube expertise. His tech journey started at the age of 12 when he inserted the first coin into the arcade machine. In 1997 he becomes editor of the renowned Serbian magazine “Svet Kompjutera” and in 2001 he started his first TV show called Game Over. After that, it was time to become a bit serious so in 2019 KursorTV was born, a TV show that was covering mostly tech topics. In 2014 Aleksandar decided to make a switch in his career and dedicate his time to YouTube. During the last 5 years, he was focused on helping brands utilize this platform to a full extent. Kojot considers YouTube channel of “Sport Klub” the prime example of YouTube SEO power. Thanks to the great content and good optimization Sport Klub channel reached[masked] subscribers in under 18 months.",
  id: 2,
  imageUrl: "https://pbs.twimg.com/media/EL--sgSXYAAnOX2.jpg",
  price: 400,
  title: "YouTube for your business!",
  userId: 2,
  quantity: 1
}

describe("Cart", () => {
  let component: RenderResult
  let dispatch: ThunkDispatch<RootState, undefined, Action>
  let totalPrice: number

  beforeEach(() => {
    const wrapper = ({ children }: { children: React.ReactChild }) => (
      <Provider store={store}>{children}</Provider>
    )
    const { result: appDispatch } = renderHook(() => useAppDispatch(), { wrapper })
    dispatch = appDispatch.current

    component = render(
      <Provider store={store}>
        <CartDrawer open={true} onClose={() => null} onTransitionEnd={() => null} />
      </Provider>
    )
  })

  afterEach(() => {
    dispatch(removeFromCart(1))
    dispatch(removeFromCart(2))
    cleanup()
  })

  it("renders the workshop images", () => {
    dispatch(addToCart(workshopItem1))
    dispatch(addToCart(workshopItem2))

    const images = component.getAllByRole("img")
    images.forEach((image, idx) => {
      expect(image).toBeInTheDocument()

      if (idx + 1 === workshopItem1.id) {
        expect(image).toHaveAttribute("src", workshopItem1.imageUrl)
      }

      if (idx + 1 === workshopItem2.id) {
        expect(image).toHaveAttribute("src", workshopItem2.imageUrl)
      }
    })
  })

  it("renders the workshop titles", () => {
    dispatch(addToCart(workshopItem1))
    dispatch(addToCart(workshopItem2))

    const titles = component.getAllByTestId("cart-item-title")
    titles.forEach((title, idx) => {
      expect(title).toBeInTheDocument()

      if (idx + 1 === workshopItem1.id) {
        expect(title.textContent).toBe(workshopItem1.title)
      }

      if (idx + 1 === workshopItem2.id) {
        expect(title.textContent).toBe(workshopItem2.title)
      }
    })
  })

  it("renders the workshop delete buttons", () => {
    dispatch(addToCart(workshopItem1))
    dispatch(addToCart(workshopItem2))

    const buttons = component.getAllByTestId("cart-item-delete-button")
    buttons.forEach(button => {
      expect(button).toBeInTheDocument()
      fireEvent.click(button)
      expect(button).not.toBeInTheDocument()
    })
  })

  it("renders the workshop ticket count dropdowns", () => {
    dispatch(addToCart(workshopItem1))
    dispatch(addToCart(workshopItem2))

    const dropdowns = document.querySelectorAll("#cart-ticket-dropdown")
    dropdowns.forEach(dropdown => {
      expect(dropdown).toBeInTheDocument()
    })
  })

  it("renders the workshop prices", () => {
    dispatch(addToCart(workshopItem1))
    dispatch(addToCart(workshopItem2))

    const prices = component.getAllByTestId("cart-item-price")
    prices.forEach((price, idx) => {
      expect(price).toBeInTheDocument()

      if (idx + 1 === workshopItem1.id) {
        expect(price.textContent).toBe(workshopItem1.price.toString() + ",00")
      }

      if (idx + 1 === workshopItem2.id) {
        expect(price.textContent).toBe(workshopItem2.price.toString() + ",00")
      }
    })
  })

  it("renders the cart total price", () => {
    dispatch(addToCart(workshopItem1))
    dispatch(addToCart(workshopItem2))

    const wrapper = ({ children }: { children: React.ReactChild }) => (
      <Provider store={store}>{children}</Provider>
    )
    const { result: appSelector } = renderHook(() => useAppSelector(state => state.cartSlice.cartTotal), {
      wrapper
    })
    totalPrice = appSelector.current

    const price = component.getByTestId("cart-total-price")
    expect(price).toBeInTheDocument()

    expect(price.textContent).toBe(totalPrice + ",00")
  })

  it("renders the cart checkout button", () => {
    let button = component.queryByTestId("cart-checkout-button")
    expect(button).not.toBeInTheDocument()

    dispatch(addToCart(workshopItem1))
    dispatch(addToCart(workshopItem2))

    button = component.getByTestId("cart-checkout-button")
    expect(button).toBeInTheDocument()
  })

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
    const drawerCounter = component.getByTestId("drawer-cart-counter")
    expect(drawerCounter).toHaveTextContent(/0/i)

    dispatch(addToCart(workshopItem1))
    expect(drawerCounter).toHaveTextContent(/1/i)

    dispatch(addToCart(workshopItem2))
    expect(drawerCounter).toHaveTextContent(/2/i)

    dispatch(removeFromCart(1))
    expect(drawerCounter).toHaveTextContent(/1/i)

    dispatch(removeFromCart(2))
    expect(drawerCounter).toHaveTextContent(/0/i)
  })
})