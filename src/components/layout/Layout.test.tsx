import { cleanup, render, RenderResult } from "@testing-library/react"
import Navbar from "./Navbar"

let component: RenderResult
beforeEach(() => (component = render(<Navbar />)))
afterEach(cleanup)

describe("Layout", () => {
  it("renders the navbar", () => {
    const navbar = component.getByRole("navigation")
    expect(navbar).toBeInTheDocument()
  })

  it("renders the logo", () => {
    const logo = component.getByTestId("logo")
    expect(logo).toBeInTheDocument()
  })

  it.todo("redirects to homepage/workshop list when clicking the logo")
  it.todo("renders the cart")
  it.todo("opens cart drawer when clicking the cart")
  it.todo("renders the item counter")
  it.todo("changes the item counter depending on workshops added")
})
