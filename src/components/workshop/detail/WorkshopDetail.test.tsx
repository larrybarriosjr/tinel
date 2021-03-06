import { fireEvent, render, screen } from "@testing-library/react"
import { store } from "app/store"
import CartDrawer from "components/cart/CartDrawer"
import { Routes } from "constants/enums"
import users from "mocks/users.json"
import workshops from "mocks/workshops.json"
import { Provider } from "react-redux"
import { MemoryRouter, Route, RouteProps } from "react-router-dom"
import selectEvent from "react-select-event"
import { WorkshopType } from "types/api"
import { monetize } from "utils/number-utils"
import { displayDate, displayTime } from "utils/text-utils"
import SimilarWorkshops from "./SimilarWorkshops"
import WorkshopDetail from "./WorkshopDetail"

describe("Workshop Detail Page", () => {
  let appLocation: RouteProps["location"]
  const workshopItem: WorkshopType = workshops[0]
  const workshopUser = users.filter(user => workshopItem.userId === user.id)[0]

  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CartDrawer
            open={true}
            onClose={() => null}
            onTransitionEnd={() => null}
            onCheckout={() => null}
          />
          <WorkshopDetail item={workshopItem} user={workshopUser} quantity={2} />
          <Route
            path="*"
            render={({ location }) => {
              appLocation = location
              return null
            }}
          />
        </MemoryRouter>
      </Provider>
    )
  })

  it("renders the workshop image", () => {
    const image = screen.getByRole("img", { name: "workshop-image" })
    expect(image).toHaveAttribute("src", workshopItem.imageUrl)
  })

  it("renders the workshop category icon", () => {
    const category = screen.getAllByRole("img", { name: "workshop-category" })[0]
    expect(category).toHaveAttribute("name", workshopItem.category)
  })

  it("renders the workshop date", () => {
    const date = screen.getByRole("heading", { name: "workshop-date" })
    expect(date).toHaveTextContent(displayDate(workshopItem.date))
  })

  it("renders the workshop time", () => {
    const time = screen.getByRole("heading", { name: "workshop-time" })
    expect(time).toHaveTextContent(displayTime(workshopItem.date))
  })

  it("renders the workshop title", () => {
    const title = screen.getByRole("heading", { name: "workshop-title" })
    expect(title).toHaveTextContent(workshopItem.title)
  })

  it("renders the workshop speaker", () => {
    const user = screen.getByRole("heading", { name: "workshop-user" })
    expect(user).toHaveTextContent(workshopUser.name)
  })

  it("renders the workshop description", () => {
    const description = screen.getByTestId("workshop-description")
    expect(description).toHaveTextContent(workshopItem.desc)
  })

  it("renders the workshop price per ticket", () => {
    const price = screen.getAllByRole("heading", { name: "workshop-price" })[0]
    expect(price).toHaveTextContent(monetize(workshopItem.price))
  })

  it("renders the number of workshop tickets", () => {
    const quantity = document.querySelector("#workshop-ticket-dropdown")
    expect(quantity?.lastChild?.firstChild).toHaveTextContent(/2/i)
  })

  it("renders the add to cart button", () => {
    const buttons = screen.getAllByRole("button", { name: "workshop-button" })
    buttons.forEach(button => {
      expect(button).toHaveTextContent(/add/i)
    })
  })

  it("renders the total price of the total amount of workshop tickets", () => {
    const total = screen.getByRole("heading", { name: "workshop-total" })
    expect(total).toHaveTextContent(monetize(workshopItem.price * 2))
  })

  it("renders the back button", () => {
    const button = screen.getByRole("button", { name: /back/i })
    expect(button).toHaveTextContent(/back/i)
  })

  it("redirects to the homepage when clicking the back button", () => {
    const button = screen.getByRole("button", { name: /back/i })
    fireEvent.click(button)
    expect(appLocation).toHaveProperty("pathname", Routes.HOME)
  })

  it("adds the number of workshop ticket when clicking the add to cart button", async () => {
    const dropdown = document.querySelector("#workshop-ticket-dropdown") as HTMLElement
    const button = screen.getAllByRole("button", { name: "workshop-button" })[0]
    const drawerCounter = screen.getByTestId("drawer-cart-counter")

    await selectEvent.select(dropdown, ["4"])
    fireEvent.click(button)
    expect(drawerCounter).toHaveTextContent(/4/i)
  })
})

describe("Similar Workshops", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SimilarWorkshops current={workshops[0]} items={workshops} />
          <Route path="*" />
        </MemoryRouter>
      </Provider>
    )
  })

  it("renders the similar workshops title", () => {
    const title = screen.getByText(/similar workshops/i)
    expect(title).toHaveTextContent(/similar workshops/i)
  })

  it("renders 3 workshops similar in categories", () => {
    const list = screen.getAllByRole("img", { name: /category/i })
    list.forEach(item => {
      expect(item).toHaveAttribute("name", "backend")
    })
  })
})
