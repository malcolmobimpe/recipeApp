import React from "react";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from "react-redux";
import './Navbar.css'

const Navbar = props => {
  const { auth, profile } = props;
  //onsole.log(props)
  const links = auth.uid ? (
    <SignedInLinks profile={profile} />
  ) : (
    <SignedOutLinks />
  );

  return (
    <div className="left-nav">
        <Link to="/" className=" left">
        <img width='75' src={require("../../media/layout/temp-logo.jpg")} />

          <h1>Tastebook</h1>
        </Link>

        <h2>{links}</h2>
    
    </div >
  );
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

export default connect(mapStateToProps)(Navbar);
