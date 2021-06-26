import { render, screen } from "@testing-library/react"
import workshops from "mocks/workshops.json"
import { WorkshopType } from "types/api"
import { displayDate, displayTime } from "utils/text-utils"
import WorkshopDetail from "./WorkshopDetail"

describe("Workshop Detail Page", () => {
  const workshopItem: WorkshopType = workshops[0]

  beforeEach(() => {
    render(<WorkshopDetail item={workshopItem} />)
  })

  it("renders the workshop image", () => {
    const imageSrc = screen.getByRole("img", { name: "workshop-image" }).getAttribute("src")
    expect(imageSrc).toBe(workshopItem.imageUrl)
  })

  it("renders the workshop category icon", () => {
    const category = screen.getByRole("img", { name: "workshop-category" }).getAttribute("name")
    expect(category).toBe(workshopItem.category)
  })

  it("renders the workshop date", () => {
    const date = screen.getByRole("heading", { name: "workshop-date" }).textContent
    expect(date).toBe(displayDate(workshopItem.date))
  })

  it("renders the workshop time", () => {
    const time = screen.getByRole("heading", { name: "workshop-time" }).textContent
    expect(time).toBe(displayTime(workshopItem.date))
  })

  it.todo("renders the workshop title")
  it.todo("renders the workshop speaker")
  it.todo("renders the workshop description")
  it.todo("renders the workshop price per ticket")
  it.todo("renders the number of workshop tickets")
  it.todo("renders the add to cart button")
  it.todo("renders the total price of the total amount of workshop tickets")
  it.todo("renders the back button")
  it.todo("redirects to the homepage when clicking the back button")
  it.todo("adds the number of workshop ticket when clicking the add to cart button")
})
