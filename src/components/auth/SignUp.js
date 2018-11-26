import React, { Component } from "react"
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../../store/actions/authActions'
import './Sign.css'

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    userName: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.signUp(this.state)
  };

  render() {
    const {auth , authError} = this.props;
    if (auth.uid) return <Redirect to='/' />
    return (
      <div className="container sign-container">
        <form onSubmit={this.handleSubmit} className="">
          <h2 className="grey-text text-darken-3">Sign Up</h2>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="text" id="password" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="userName">User Name</label>
            <input type="text" id="userName" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <button className="sign-btn">Sign Up</button>
          </div>
          <div className="red-text">{ authError ? <p>{authError}</p>:null}</div>
        </form>
      </div>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
   signUp: (newUser) => dispatch(signUp(newUser))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignUp)