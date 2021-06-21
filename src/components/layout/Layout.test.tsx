import { cleanup, render, RenderResult } from "@testing-library/react"
import { Routes } from "constants/enums"
import { MemoryRouter, Route, RouteProps } from "react-router-dom"
import Navbar from "./Navbar"

let component: RenderResult
let appLocation: RouteProps["location"]

beforeEach(() => {
  component = render(
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
  )
})

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

  it("redirects to homepage/workshop list when clicking the logo", () => {
    component.getByTestId("logo-link").click()
    expect(appLocation?.pathname).toBe(Routes.HOME)
  })

  it.todo("renders the cart")
  it.todo("opens cart drawer when clicking the cart")
  it.todo("renders the item counter")
  it.todo("changes the item counter depending on workshops added")
})
