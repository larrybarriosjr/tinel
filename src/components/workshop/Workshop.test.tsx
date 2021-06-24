import { fireEvent, render, screen } from "@testing-library/react"
import { store } from "app/store"
import Navbar from "components/layout/Navbar"
import dayjs from "dayjs"
import workshops from "mocks/workshops.json"
import { Provider } from "react-redux"
import { MemoryRouter, Route, RouteProps } from "react-router-dom"
import { monetize } from "utils/number-utils"
import { displayDate, displayTime } from "utils/text-utils"
import WorkshopList from "./WorkshopList"

describe("Workshop", () => {
  let appLocation: RouteProps["location"]

  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar />
          <WorkshopList items={workshops} />
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

  it("redirects to detail page when clicking the workshop image in the workshop items", () => {
    const links = screen.getAllByRole("link", { name: "workshop-image-link" })
    links.forEach(link => {
      fireEvent.click(link)
      expect(appLocation?.pathname).toBe(link.getAttribute("href"))
    })
  })

  it("redirects to detail page when clicking the workshop title in the workshop items", () => {
    const links = screen.getAllByRole("link", { name: "workshop-title-link" })
    links.forEach(link => {
      fireEvent.click(link)
      expect(appLocation?.pathname).toBe(link.getAttribute("href"))
    })
  })

  it("renders the cart drawer when clicking the add to cart button", () => {
    const buttonTexts = screen.getAllByRole("button", { name: "workshop-button-text" })
    const buttonIcons = screen.getAllByRole("button", { name: "workshop-button-icon" })

    buttonTexts.forEach(button => {
      fireEvent.click(button)

      const sidebar = screen.getByRole("complementary")
      const closeButton = screen.getByTestId("drawer-close-button")

      expect(sidebar).toBeInTheDocument()
      fireEvent.click(closeButton)
      fireEvent.transitionEnd(sidebar)
      expect(sidebar).not.toBeInTheDocument()
    })

    buttonIcons.forEach(button => {
      fireEvent.click(button)

      const sidebar = screen.getByRole("complementary")
      const closeButton = screen.getByTestId("drawer-close-button")

      expect(sidebar).toBeInTheDocument()
      fireEvent.click(closeButton)
      fireEvent.transitionEnd(sidebar)
      expect(sidebar).not.toBeInTheDocument()
    })
  })

  it.todo("changes the item counter when clicking the add to cart button")
  it.todo("lists 9 or less workshop items at the start")
  it.todo("renders the load more button")
  it.todo("lists another 9 or less workshop items when clicking the load more button")
})
