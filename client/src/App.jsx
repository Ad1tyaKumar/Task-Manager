import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import Edit from './components/Edit'
import Login from './components/Login'
import Register from './components/Register'

//Styles
import './styles/Header.css'
import './styles/Home.css'
import './styles/Edit.css'
import './styles/Login.css'
import './styles/Register.css'


const App = () => {
  return (
    <Router>
      
      <Routes>
        <Route path='/' element={<><Header/><Home/> </>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/:id' element={<><Header/><Edit/></>}/>
      </Routes>
    </Router>
  )
}

export default App
