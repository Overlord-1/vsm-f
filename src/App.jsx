import React from 'react'
import Portfolio from './pages/Portfolio'
import Leaderboard from './pages/Leaderboard'
import News from './pages/News'
import { Route, Routes } from 'react-router'

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element= {<Portfolio />}/>
      <Route path='/Leaderboard' element= {<Leaderboard />}/>
      <Route path='/news' element= {<News />}/>
    </Routes>
    </>
  )
  
}

export default App
