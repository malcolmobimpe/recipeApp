import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import {signOut } from '../../store/actions/authActions'
const SignedInLinks = (props) =>  {
      return(
          <ul className="">
<li>  <NavLink to='/create'>New Recipe</NavLink></li>
<li><a onClick={props.signOut}> Logout</a></li>       
<li>  <NavLink to='/' className=' '>
{props.profile.userName}</NavLink></li>        
         
         
          </ul>
      )

}
const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}
export default connect(null, mapDispatchToProps)(SignedInLinks);