import React from 'react'
import './Header.css'
import image from '../images/logo-removebg-preview.png'

export default function Header() {
  return (
    <div className='Header'>
      <div className='logo-container'>
        <img src={image} alt="Logo" className='logo-image' />
      </div>
    </div>

  )
}
