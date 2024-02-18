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
    <>
      <Header text={"Portfolio"} />
      <PLtracker
        invested={"2894.54"}
        current={"2782.3"}
        profit={"-239"}
        perChg={"-4.5"}
      />
      <Button
        text={"View all stocks"}
        txtColor={"#ffffff"}
        bgColor={"#343434"}
      />
      <MiddleRow />
      {data.map(parameter=>(
        <Card name={parameter.name} avg={parameter.avg} quantity={parameter.quantity} LTP={parameter.LTP} profit={parameter.profit} />
      ))}  
     </>
  );
}

export default App
