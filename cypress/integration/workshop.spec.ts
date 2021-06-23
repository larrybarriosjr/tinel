import { Routes } from "constants/enums"
import { displayDate, displayTime } from "utils/text-utils"
import { BASE_URL, WORKSHOPS_LIMIT, WORKSHOPS_PAGE, WORKSHOPS_URL } from "../env"

describe("Workshop List", () => {
  before(() => {
    cy.visit(Routes.HOME)
  })

  it("renders the workshop images", () => {
    cy.request(`${BASE_URL}${WORKSHOPS_URL}${WORKSHOPS_PAGE}1${WORKSHOPS_LIMIT}9`).then(response => {
      const itemsSrcs = response.body.map((item: { imageUrl: string }) => item.imageUrl)
      cy.get("img").should($el => {
        const srcs = $el.toArray().map(el => el.src)
        expect(srcs).to.deep.equal(itemsSrcs)
      })
    })
  })

  it("renders the workshop category icons", () => {
    cy.request(`${BASE_URL}${WORKSHOPS_URL}${WORKSHOPS_PAGE}1${WORKSHOPS_LIMIT}9`).then(response => {
      const itemsCategories = response.body.map((item: { category: string }) => item.category)
      cy.get("[data-testid=category-icon] svg").should($el => {
        const categories = $el.toArray().map(el => el.getAttribute("name"))
        expect(categories).to.deep.equal(itemsCategories)
      })
    })
  })

  it("renders the workshop dates", () => {
    cy.request(`${BASE_URL}${WORKSHOPS_URL}${WORKSHOPS_PAGE}1${WORKSHOPS_LIMIT}9`).then(response => {
      const itemDates = response.body.map((item: { date: string }) => displayDate(item.date))
      cy.get("[data-testid=workshop-date]").should($el => {
        const dates = $el.toArray().map(el => el.textContent)
        expect(dates).to.deep.equal(itemDates)
      })
    })
  })

  it("renders the workshop times", () => {
    cy.request(`${BASE_URL}${WORKSHOPS_URL}${WORKSHOPS_PAGE}1${WORKSHOPS_LIMIT}9`).then(response => {
      const itemTimes = response.body.map((item: { date: string }) => displayTime(item.date))
      cy.get("[data-testid=workshop-time]").should($el => {
        const times = $el.toArray().map(el => el.textContent)
        expect(times).to.deep.equal(itemTimes)
      })
    })
  })

  it("renders the workshop titles", () => {
    cy.request(`${BASE_URL}${WORKSHOPS_URL}${WORKSHOPS_PAGE}1${WORKSHOPS_LIMIT}9`).then(response => {
      const itemTitles = response.body.map((item: { title: string }) => item.title)
      cy.get("[data-testid=workshop-title]").should($el => {
        const titles = $el.toArray().map(el => el.textContent)
        expect(titles).to.deep.equal(itemTitles)
      })
    })
  })

  it("renders the workshop prices", () => {
    cy.request(`${BASE_URL}${WORKSHOPS_URL}${WORKSHOPS_PAGE}1${WORKSHOPS_LIMIT}9`).then(response => {
      const itemPrices = response.body.map((item: { price: number }) => item.price.toString() + ",00")
      cy.get("[data-testid=workshop-price]").should($el => {
        const prices = $el.toArray().map(el => el.textContent)
        expect(prices).to.deep.equal(itemPrices)
      })
    })
  })

  it("renders the add to cart buttons in the workshop items", () => {
    cy.request(`${BASE_URL}${WORKSHOPS_URL}${WORKSHOPS_PAGE}1${WORKSHOPS_LIMIT}9`).then(response => {
      const itemLength = response.body.length
      cy.get("[data-testid=workshop-button]").should($el => {
        const elLength = $el.toArray().length
        const addToCart = $el.toArray().map(el => el.textContent)[0]
        expect(elLength).to.equal(itemLength)
        expect(addToCart).to.match(/add to cart/i)
      })
    })
  })
})
