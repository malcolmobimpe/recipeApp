import React from 'react'
import { NavLink } from 'react-router-dom'

class SignedOutLinks extends React.Component {
  render(){
      return(
          <div className="nav-links">
<NavLink to='/signup'>Sign Up</NavLink>

  <NavLink to='/signin'>Log In</NavLink>
          </div>
      )
}
}
export default SignedOutLinks;