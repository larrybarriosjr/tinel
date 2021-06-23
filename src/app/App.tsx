import Navbar from "components/layout/Navbar"
import { Routes } from "constants/enums"
import HomePage from "pages/HomePage"
import { Fragment } from "react"
import { Route, Switch } from "react-router-dom"

function App() {
  return (
    <Fragment>
      <Navbar />

      <Switch>
        <Route exact path={Routes.HOME} component={HomePage} />
        <Route path={Routes.WORKSHOP_PATH} />
      </Switch>

      {/* FIXME: Remove later. This enables scrolling temporarily */}
      <div style={{ height: "100vh" }} />
    </Fragment>
  )
}

export default App
