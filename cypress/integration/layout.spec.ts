import { Routes } from "constants/enums"

describe("Sticky Navbar", () => {
  before(() => {
    cy.visit(Routes.HOME)
  })

  it("always renders the sticky navbar at the top", () => {
    cy.document().then(document => {
      const div = document.createElement("div")
      div.style.height = "100vh"
      document.getElementById("root")?.appendChild(div)
    })

    cy.scrollTo("bottom").isWithinViewport("nav")
  })
})
