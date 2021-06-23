import { Routes } from "constants/enums"

beforeEach(() => {
  cy.visit(Routes.HOME)
})

describe("Sticky Navbar", () => {
  it("always renders the sticky navbar at the top", () => {
    cy.scrollTo("bottom").isWithinViewport("nav")
  })
})

describe("Cart Drawer", () => {
  it("renders the cart drawer in full width on small screens", () => {
    cy.viewport("iphone-x")
    cy.get("[data-testid=cart-button]").click()
    cy.get("aside").invoke("outerWidth").should("be.within", 358, 375)
  })

  it("renders the cart drawer in 380px width on big screens", () => {
    cy.get("[data-testid=cart-button]").click()
    cy.get("aside").invoke("innerWidth").should("eq", 380)
  })
})

describe("Workshop List", () => {
  it("renders the workshop images", () => {
    cy.request("http://localhost:3000/workshops?_page=1&_limit=9").then(response => {
      const itemsSrcs = response.body.map((item: { imageUrl: string }) => item.imageUrl)
      cy.get("img").should($el => {
        const srcs = $el.toArray().map(el => el.src)
        expect(srcs).to.deep.equal(itemsSrcs)
      })
    })
  })
