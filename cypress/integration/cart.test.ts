import { Routes } from "constants/enums"

describe("Cart Drawer", () => {
  before(() => {
    cy.visit(Routes.HOME)
  })

  it("renders the cart drawer in full width on small screens", () => {
    cy.viewport("iphone-x")
    cy.get("[data-testid=cart-button]").click()
    cy.get("aside").invoke("outerWidth").should("be.within", 358, 375)
    cy.get("[data-testid=drawer-close-button]").click()
  })

  it("renders the cart drawer in 380px width on big screens", () => {
    cy.get("[data-testid=cart-button]").click()
    cy.get("aside").invoke("innerWidth").should("eq", 380)
    cy.get("[data-testid=drawer-close-button]").click()
  })
})
