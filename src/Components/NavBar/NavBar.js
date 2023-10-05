import React from 'react'
import "./NavBar.css"

function NavBar() {
  return (
    <nav className='nav-container'>
        <div>
            <img src="" alt='logo' />
        </div>
        <div>
            <button className='button'>Sort By Price</button>
            <button className='button'>Add Product</button>
        </div>
    </nav>
  )
}

export default NavBar