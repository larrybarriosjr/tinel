import { cleanup, render, RenderResult } from "@testing-library/react"

let component: RenderResult
beforeEach(() => {
  component = render(<></>)
})

afterEach(cleanup)

describe("Layout", () => {
  it.todo("always renders the sticky navbar at the top")
  it.todo("renders the logo")
  it.todo("redirects to homepage/workshop list when clicking the logo")
  it.todo("renders the cart")
  it.todo("opens cart drawer when clicking the cart")
  it.todo("renders the item counter")
  it.todo("changes the item counter depending on workshops added")
})
