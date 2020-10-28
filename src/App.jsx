import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import Login from './pages/login/Login'
import "./App.scss"

export default function App() {
  return (
    <Router>
      <Login/>
    </Router>
  )
}

