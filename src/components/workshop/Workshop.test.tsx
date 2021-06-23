import { cleanup, render, RenderResult } from "@testing-library/react"
import { store } from "app/store"
import HomePage from "pages/HomePage"
import { Provider } from "react-redux"

describe("Workshop", () => {
  let component: RenderResult

  beforeEach(() => {
    component = render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    )
  })

  afterEach(cleanup)

  it.todo("renders the workshop images")
  it.todo("renders the workshop category icons")
  it.todo("renders the workshop dates")
  it.todo("renders the workshop times")
  it.todo("renders the workshop titles")
  it.todo("renders the workshop prices and currencies")
  it.todo("renders the add to cart buttons in the workshop items")
  it.todo("lists the workshop items in descending chronological order (recent to oldest)")
  it.todo("redirects to detail page when clicking the workshop image and title in the workshop items")
  it.todo("renders the cart drawer when clicking the add to cart button")
  it.todo("changes the item counter when clicking the add to cart button")
  it.todo("lists 9 or less workshop items at the start")
  it.todo("renders the load more button")
  it.todo("lists another 9 or less workshop items when clicking the load more button")
})
