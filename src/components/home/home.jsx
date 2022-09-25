import React from 'react'
import { Link } from 'react-router-dom'
import './home.css'

export default function Home() {
  return (
    <div className='home'>
        <h1>Welcome to CHATSCRUM</h1>
        <div className='sign'>
            <h4><Link to='/signup'>SIGN UP</Link></h4>
            <h4><Link to='/signin'>SIGN IN</Link></h4>
        </div>
    </div>
  )
}
