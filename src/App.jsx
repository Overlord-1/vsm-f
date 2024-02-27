import React from 'react'
import Portfolio from './pages/Portfolio'
import Leaderboard from './pages/Leaderboard'
import News from './pages/News'
import Login from './pages/Login'
 
import { Route, Routes } from 'react-router'


const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element= {<Login />}/>
      <Route path='/Leaderboard' element= {<Leaderboard />}/>
      <Route path='/news' element= {<News />}/>
      <Route path='/portfolio' element= {<Portfolio />}/>
    </Routes>
    </>
  )
  
}

export default App
