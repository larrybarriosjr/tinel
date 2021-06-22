import { cleanup, render, RenderResult } from "@testing-library/react"
import CartDrawer from "./CartDrawer"

describe("Cart", () => {
  let component: RenderResult

  beforeEach(() => {
    component = render(<CartDrawer />)
  })

  afterEach(cleanup)

  it.todo("renders the workshop images")
  it.todo("renders the workshop titles")
  it.todo("renders the workshop ticket count dropdowns")
  it.todo("renders the workshop prices")
  it.todo("renders the cart total price")
  it.todo("renders the cart checkout button")
  it.todo("renders the item counter in the cart drawer")
  it.todo("renders the cart icon in the cart drawer")
  it.todo("changes the item counter in the cart drawer depending on workshops added")
})
