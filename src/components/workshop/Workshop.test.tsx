import { render, screen } from "@testing-library/react"
import { store } from "app/store"
import dayjs from "dayjs"
import workshops from "mocks/workshops.json"
import { Provider } from "react-redux"
import { monetize } from "utils/number-utils"
import { displayDate, displayTime } from "utils/text-utils"
import WorkshopList from "./WorkshopList"

describe("Workshop", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <WorkshopList items={workshops} />
      </Provider>
    )
  })

  it("renders the workshop images", () => {
    const imageSrcs = screen
      .getAllByRole("img", { name: "workshop-image" })
      .map(img => img.getAttribute("src"))
    const imageUrls = workshops
      .sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix())
      .map(workshop => workshop.imageUrl)
    expect(imageSrcs).toStrictEqual(imageUrls)
  })

  it("renders the workshop category icons", () => {
    const categoryIcons = screen
      .getAllByRole("img", { name: "workshop-category" })
      .map(icon => icon.getAttribute("name"))
    const categories = workshops
      .sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix())
      .map(workshop => workshop.category)
    expect(categoryIcons).toStrictEqual(categories)
  })

  it("renders the workshop dates", () => {
    const dateTexts = screen
      .getAllByRole("heading", { name: "workshop-date" })
      .map(icon => icon.textContent)
    const dates = workshops
      .sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix())
      .map(workshop => displayDate(workshop.date))
    expect(dateTexts).toStrictEqual(dates)
  })

  it("renders the workshop times", () => {
    const timeTexts = screen
      .getAllByRole("heading", { name: "workshop-time" })
      .map(icon => icon.textContent)
    const times = workshops
      .sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix())
      .map(workshop => displayTime(workshop.date))
    expect(timeTexts).toStrictEqual(times)
  })

  it("renders the workshop titles", () => {
    const titleTexts = screen
      .getAllByRole("heading", { name: "workshop-title" })
      .map(icon => icon.textContent)
    const titles = workshops
      .sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix())
      .map(workshop => workshop.title)
    expect(titleTexts).toStrictEqual(titles)
  })

  it("renders the workshop prices", () => {
    const priceTexts = screen
      .getAllByRole("heading", { name: "workshop-price" })
      .map(icon => icon.textContent)
    const prices = workshops
      .sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix())
      .map(workshop => monetize(workshop.price))
    expect(priceTexts).toStrictEqual(prices)
  })

  it("renders the add to cart buttons in the workshop items", () => {
    const buttons = screen.getAllByRole("button", { name: "workshop-button-text" })
    const prices = workshops.length
    buttons.forEach(button => {
      expect(button.textContent).toMatch(/add to cart/i)
    })
    expect(buttons.length).toBe(prices)
  })

  it("renders the cart icon buttons in the workshop items", () => {
    const buttons = screen.getAllByRole("button", { name: "workshop-button-icon" })
    const prices = workshops.length
    buttons.forEach(button => {
      expect(button.textContent).toMatch(/cart/i)
    })
    expect(buttons.length).toBe(prices)
  })

  it("lists the workshop items in descending chronological order (recent to oldest)", () => {
    const dates = screen
      .getAllByRole("heading", { name: "workshop-date" })
      .map(date => date.getAttribute("aria-details"))
    const sortedDates = workshops
      .sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix())
      .map(item => item.date)
    expect(dates).toStrictEqual(sortedDates)
  })

  it.todo("redirects to detail page when clicking the workshop image and title in the workshop items")
  it.todo("renders the cart drawer when clicking the add to cart button")
  it.todo("changes the item counter when clicking the add to cart button")
  it.todo("lists 9 or less workshop items at the start")
  it.todo("renders the load more button")
  it.todo("lists another 9 or less workshop items when clicking the load more button")
})
