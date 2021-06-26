import { fireEvent, render, screen } from "@testing-library/react"
import { renderHook } from "@testing-library/react-hooks"
import { store } from "app/store"
import Navbar from "components/layout/Navbar"
import { useAppDispatch } from "hooks/redux"
import categories from "mocks/categories.json"
import workshops from "mocks/workshops.json"
import { Provider } from "react-redux"
import { MemoryRouter, Route, RouteProps } from "react-router-dom"
import { clearCart } from "states/cart"
import { sortByDateDesc } from "utils/array-utils"
import { monetize } from "utils/number-utils"
import { displayDate, displayTime } from "utils/text-utils"
import WorkshopFilter from "./WorkshopFilter"
import WorkshopList from "./WorkshopList"

describe("Workshop Items", () => {
  let appLocation: RouteProps["location"]

  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar />
          <WorkshopFilter categories={categories} onSelect={() => null} selected="all" />
          <WorkshopList items={workshops} limit={9} onLoadMore={() => null} />
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
    const imageUrls = workshops.map(workshop => workshop.imageUrl)
    expect(imageSrcs).toStrictEqual(imageUrls)
  })

  it("renders the workshop category icons", () => {
    const categoryIcons = screen
      .getAllByRole("img", { name: "workshop-category" })
      .map(icon => icon.getAttribute("name"))
    const categories = workshops.map(workshop => workshop.category)
    expect(categoryIcons).toStrictEqual(categories)
  })

  it("renders the workshop dates", () => {
    const dateTexts = screen
      .getAllByRole("heading", { name: "workshop-date" })
      .map(icon => icon.textContent)
    const dates = workshops.map(workshop => displayDate(workshop.date))
    expect(dateTexts).toStrictEqual(dates)
  })

  it("renders the workshop times", () => {
    const timeTexts = screen
      .getAllByRole("heading", { name: "workshop-time" })
      .map(icon => icon.textContent)
    const times = workshops.map(workshop => displayTime(workshop.date))
    expect(timeTexts).toStrictEqual(times)
  })

  it("renders the workshop titles", () => {
    const titleTexts = screen
      .getAllByRole("heading", { name: "workshop-title" })
      .map(title => title.textContent)
    const titles = workshops.map(workshop => workshop.title)
    expect(titleTexts).toStrictEqual(titles)
  })

  it("renders the workshop prices", () => {
    const priceTexts = screen
      .getAllByRole("heading", { name: "workshop-price" })
      .map(price => price.textContent)
    const prices = workshops.map(workshop => monetize(workshop.price))
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

  it("changes the item counter when clicking the add to cart button", () => {
    const wrapper = ({ children }: { children: React.ReactChild }) => (
      <Provider store={store}>{children}</Provider>
    )
    const { result } = renderHook(() => useAppDispatch(), { wrapper })
    const dispatch = result.current

    const buttonTexts = screen.getAllByRole("button", { name: "workshop-button-text" })
    const buttonIcons = screen.getAllByRole("button", { name: "workshop-button-icon" })

    buttonTexts.forEach(button => {
      dispatch(clearCart())
      fireEvent.click(button)

      const navbarCounter = screen.getByTestId("navbar-cart-counter")
      expect(navbarCounter).toHaveTextContent(/1/i)

      fireEvent.click(button)
      expect(navbarCounter).toHaveTextContent(/2/i)
    })

    buttonIcons.forEach(button => {
      dispatch(clearCart())
      fireEvent.click(button)

      const navbarCounter = screen.getByTestId("navbar-cart-counter")
      expect(navbarCounter).toHaveTextContent(/1/i)

      fireEvent.click(button)
      expect(navbarCounter).toHaveTextContent(/2/i)
    })
  })

  it("lists 9 or less workshop items at the start", () => {
    const items = screen.getAllByRole("heading", { name: "workshop-title" }).slice(0, 9)
    expect(items.length).toBeLessThanOrEqual(9)
  })

  it("renders the load more button", () => {
    const button = screen.queryByRole("button", { name: "load-more-button" })
    if (workshops.length >= 9) {
      expect(button?.textContent).toMatch(/load more/i)
    } else {
      expect(button).not.toBeInTheDocument()
    }
  })

  it("renders the list of categories", () => {
    const button = screen.getByRole("button", { name: "category-filter-button" })
    fireEvent.click(button)

    const items = screen
      .getAllByRole("heading", { name: "category-item" })
      .map(item => item.textContent?.toLowerCase())
    expect(items).toStrictEqual(categories.reverse())
  })
})

describe("Workshop Sort", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar />
          <WorkshopFilter categories={categories} onSelect={() => null} selected="all" />
          <WorkshopList items={sortByDateDesc(workshops, "date")} limit={9} onLoadMore={() => null} />
          <Route path="*" />
        </MemoryRouter>
      </Provider>
    )
  })

  it("lists the workshop items in descending chronological order (recent to oldest)", () => {
    const dates = screen
      .getAllByRole("heading", { name: "workshop-date" })
      .map(date => date.getAttribute("aria-details"))
    const sortedDates = sortByDateDesc(workshops, "date").map(item => item.date)
    expect(dates).toStrictEqual(sortedDates)
  })
})

describe("Workshop Filter", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar />
          <WorkshopFilter categories={categories} onSelect={() => null} selected="design" />
          <WorkshopList
            items={workshops.filter(item => item.category === "design")}
            limit={9}
            onLoadMore={() => null}
          />
          <Route path="*" />
        </MemoryRouter>
      </Provider>
    )
  })

  it("filters the workshop items depending on category", () => {
    screen
      .getAllByRole("img", { name: "workshop-category" })
      .map(icon => icon.getAttribute("name"))
      .forEach(item => {
        expect(item).toBe("design")
      })
  })
})
