import { Routes } from "constants/enums"
import { BASE_URL, WORKSHOPS_LIMIT, WORKSHOPS_PAGE, WORKSHOPS_URL } from "../env"

beforeEach(() => {
  cy.visit(Routes.HOME)
})

describe("Workshop List", () => {
  it("renders the workshop images", () => {
    cy.request(`${BASE_URL}${WORKSHOPS_URL}${WORKSHOPS_PAGE}1${WORKSHOPS_LIMIT}9`).then(response => {
      const itemsSrcs = response.body.map((item: { imageUrl: string }) => item.imageUrl)
      cy.get("img").should($el => {
        const srcs = $el.toArray().map(el => el.src)
        expect(srcs).to.deep.equal(itemsSrcs)
      })
    })
  })
})
