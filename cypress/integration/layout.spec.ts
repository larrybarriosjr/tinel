import { Routes } from "constants/enums"

describe("Sticky Navbar", () => {
  before(() => {
    cy.visit(Routes.HOME)
  })

  it("always renders the sticky navbar at the top", () => {
    cy.scrollTo("bottom").isWithinViewport("nav")
  })
})
