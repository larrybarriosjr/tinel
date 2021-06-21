import Navbar from "components/layout/Navbar"
import { Fragment } from "react"

function App() {
  return (
    <Fragment>
      <Navbar />

      {/* FIXME: Remove later. This enables scrolling temporarily */}
      <div style={{ height: "100vh" }} />
    </Fragment>
  )
}

export default App
