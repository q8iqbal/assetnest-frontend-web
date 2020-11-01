import React from 'react'
import {BrowserRouter as Router, Switch} from 'react-router-dom'
import { createBrowserHistory } from "history"
import { APP_ROUTE } from "./Routes"
import PrivateRoute from "./components/PrivateRoute"
import PublicRoute from "./components/PublicRoute"
import "./App.scss"

export const history = createBrowserHistory();
export default function App() {
  return (
    <Router>
      <Switch>
        {APP_ROUTE.map((value, index) => {
          if (value.private){
            return (<PrivateRoute
              key={value.name}
              component={value.component}
              path={value.path}
              exact={value.exact}
            />)
          }else{
            return (<PublicRoute
              key={value.name}
              component={value.component}
              restricted={value.restricted}
              path={value.path}
              exact={value.exact}
            />)
          }
        })}
      </Switch>
    </Router>
  )
}

