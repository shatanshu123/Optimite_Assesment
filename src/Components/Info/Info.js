import React, { useEffect, useState } from 'react'
import { Link, generatePath } from 'react-router-dom'
import logo from "../../Assets/logo.jpg"
import "./Info.css";

function Info() {

  return (
    <div>
        <nav className='nav-container'>
            <div>
                <Link className='text-normal' to="/">
                    <img className='logo' src={logo} alt='logo' width="60px"/>
                </Link>
            </div>
            <div>
                <Link className='text-normal' to="/">
                    <button className='button'>Back</button>
                </Link>
            </div>
        </nav>
        <div className='info-container'>
                <div>
                    <img src='https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg' width="300px"/>
                </div>
                <div>
                    <h2>Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops</h2>
                    <p style={{opacity: "0.9"}}>Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday</p>
                    <h3>$ 109.5</h3>
                </div>
            </div>
    </div>
  )
}

export default Info