import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";
import TestSignUp from "../auth/TestSignUp";
import { HashLink as Link } from "react-router-hash-link";
import "./LandingPage.css";

class LandingPage extends Component {
  render() {
    return (
      <div className="landing-page">
        <div className="landing-nav">
          <Link to="#sign-box">
            <span>Login</span>
          </Link>
          <Link to="/">
            <img
              width="150"
              src={require("../../media/logo/tastebook-wide.png")}
            />
          </Link>
          <Link to="#sign-box">
            <span>Sign Up</span>
          </Link>
        </div>
        <div className="landing-hero">
          <div className="">
            <div>
              <h1>Tastebook. It's facebook but for food!</h1>
            </div>
            <span>Store and share your precious recipes </span>
            <br />
            <div>
              <Link to="#sign-box">
                <span
                  style={{ "margin-right": "2%" }}
                  className="green-button-inv"
                >
                  Login/SignUp
                </span>
              </Link>
              <Link to="#try-box">
                <span className="grey-button">Try</span>
              </Link>
            </div>
          </div>
          <div className="hero-background" />
        </div>
        <div id="sign-box" className="sign-page">
          <div className="signin-up">
            <SignIn />
            <SignUp />
            <div className="sign-container  " id="try-box">
              <TestSignUp />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
