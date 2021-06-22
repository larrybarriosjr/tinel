import { Routes } from "constants/enums"

beforeEach(() => {
  cy.visit(Routes.HOME)
})

describe("Cypress", () => {
  it("always renders the sticky navbar at the top", () => {
    cy.scrollTo("bottom").isWithinViewport("nav")
  })
})
