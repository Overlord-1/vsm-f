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
      <Route path='/' element= {<Portfolio />}/>
      <Route path='/Leaderboard' element= {<Leaderboard />}/>
      <Route path='/news' element= {<News />}/>
      <Route path='/login' element= {<Login />}/>
    </Routes>
    </>
  )
  
}

export default App
