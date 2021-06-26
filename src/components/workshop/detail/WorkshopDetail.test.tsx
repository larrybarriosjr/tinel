import { render, screen } from "@testing-library/react"
import users from "mocks/users.json"
import workshops from "mocks/workshops.json"
import { WorkshopType } from "types/api"
import { monetize } from "utils/number-utils"
import { displayDate, displayTime } from "utils/text-utils"
import WorkshopDetail from "./WorkshopDetail"

describe("Workshop Detail Page", () => {
  const workshopItem: WorkshopType = workshops[0]
  const workshopUser = users.find(user => workshopItem.userId === user.id)

  beforeEach(() => {
    render(<WorkshopDetail item={workshopItem} user={workshopUser} quantity={2} />)
  })

  it("renders the workshop image", () => {
    const imageSrc = screen.getByRole("img", { name: "workshop-image" }).getAttribute("src")
    expect(imageSrc).toEqual(workshopItem.imageUrl)
  })

  it("renders the workshop category icon", () => {
    const category = screen.getByRole("img", { name: "workshop-category" }).getAttribute("name")
    expect(category).toEqual(workshopItem.category)
  })

  it("renders the workshop date", () => {
    const date = screen.getByRole("heading", { name: "workshop-date" }).textContent
    expect(date).toEqual(displayDate(workshopItem.date))
  })

  it("renders the workshop time", () => {
    const time = screen.getByRole("heading", { name: "workshop-time" }).textContent
    expect(time).toEqual(displayTime(workshopItem.date))
  })

  it("renders the workshop title", () => {
    const title = screen.getByRole("heading", { name: "workshop-title" }).textContent
    expect(title).toEqual(workshopItem.title)
  })

  it("renders the workshop speaker", () => {
    const user = screen.getByRole("heading", { name: "workshop-user" }).textContent
    expect(user).toEqual(workshopUser?.name)
  })

  it("renders the workshop description", () => {
    const description = screen.getByTestId("workshop-description").textContent
    expect(description).toEqual(workshopItem.desc)
  })

  it("renders the workshop price per ticket", () => {
    const price = screen.getByRole("heading", { name: "workshop-price" }).textContent
    expect(price).toEqual(monetize(workshopItem.price))
  })

  it("renders the number of workshop tickets", () => {
    const quantity = document.querySelector("#workshop-ticket-dropdown")
    expect(quantity?.lastChild?.firstChild?.textContent).toEqual("2")
  })

  it.todo("renders the add to cart button")
  it.todo("renders the total price of the total amount of workshop tickets")
  it.todo("renders the back button")
  it.todo("redirects to the homepage when clicking the back button")
  it.todo("adds the number of workshop ticket when clicking the add to cart button")
})
