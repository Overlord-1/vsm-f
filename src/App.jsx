import React, {  } from 'react'
import Portfolio from './pages/Portfolio'
import Leaderboard from './pages/Leaderboard'
import News from './pages/News'
import Login from './pages/Login'
// import io from 'socket.io-client' 
import { Route, Routes } from 'react-router'
import Loading from './pages/Loading'
import CalcRound from './pages/CalcRound'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"




const App = () => {


  return (
    <>
    
    <Routes>
      <Route path='/' element= {<Login />}/>
      <Route path='/Leaderboard' element= {<Leaderboard />}/>
      <Route path='/news' element= {<News />}/>
      <Route path='/portfolio' element= {<Portfolio />}/>
      <Route path='/loading' element= {<Loading />}/>
      <Route path='/calcround' element= {<CalcRound />}/>
    </Routes>
    <Analytics />
    <SpeedInsights />
    </>
  )
  
}

export default App
