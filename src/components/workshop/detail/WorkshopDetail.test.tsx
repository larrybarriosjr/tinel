import { render, screen } from "@testing-library/react"
import users from "mocks/users.json"
import workshops from "mocks/workshops.json"
import { WorkshopType } from "types/api"
import { monetize } from "utils/number-utils"
import { displayDate, displayTime } from "utils/text-utils"
import WorkshopDetail from "./WorkshopDetail"

describe("Workshop Detail Page", () => {
  const workshopItem: WorkshopType = workshops[0]
  const workshopUser = users.filter(user => workshopItem.userId === user.id)[0]

  beforeEach(() => {
    render(<WorkshopDetail item={workshopItem} user={workshopUser} quantity={2} />)
  })

  it("renders the workshop image", () => {
    const image = screen.getByRole("img", { name: "workshop-image" })
    expect(image).toHaveAttribute("src", workshopItem.imageUrl)
  })

  it("renders the workshop category icon", () => {
    const category = screen.getByRole("img", { name: "workshop-category" })
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
    const price = screen.getByRole("heading", { name: "workshop-price" })
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

  it.todo("renders the total price of the total amount of workshop tickets")
  it.todo("renders the back button")
  it.todo("redirects to the homepage when clicking the back button")
  it.todo("adds the number of workshop ticket when clicking the add to cart button")
})
