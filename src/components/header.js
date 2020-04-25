import React from "react"
import "./header.css"
import Container from "./container"

function Header() {
  return (
    <header className='header'>
      <Container>
        <span className='header__brand'>do things work?</span>
        <span className='header__text'>
          a todo app <em>(of sorts)</em> by <strong>Raith Hamzah</strong>
        </span>
      </Container>
    </header>
  )
}

export default Header
