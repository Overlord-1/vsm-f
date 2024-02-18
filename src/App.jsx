import React from 'react'
import Portfolio from './pages/Portfolio'
import Leaderboard from './pages/Leaderboard'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/leaderboard" component={Leaderboard} />
        <Route path="/" exact component={Portfolio} />
      </Switch>
    </Router>
  )
}

export default App
