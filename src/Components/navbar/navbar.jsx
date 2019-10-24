import React from 'react'
import {Link} from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className='transparent'>
      <div className="nav-wrapper">
        <Link to='/' className="brand-logo"><h3>MOVIES</h3></Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><Link to='/'>Home</Link></li>
          <li><a>Login</a></li>
          <li><a className='btn white'>Sign Up</a></li>
        </ul>
      </div>
    </nav>
  )
}
