import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Header.css'
const Header = () => {
  return (
    <nav>
    <p>HELLO GUEST</p>
      <Link>
        Login
      </Link>
    </nav>
  )
}

export default Header
