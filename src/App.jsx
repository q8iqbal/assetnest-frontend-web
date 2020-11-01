import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import User from './pages/user/User'
import "./App.scss"


export default function App() {
  return (
    <Router>
      <User companyName="PT. Bumi Putra Asset Management System" adminName="Maulina Lumina"/>
    </Router>
  )
}
