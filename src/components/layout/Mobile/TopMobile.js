import React from "react";
import "./TopMobile.css";
import { Link } from "react-router-dom";
import SignedInLinks from "../SignedInLinks";
import SignedOutLinks from "../SignedOutLinks";
import { connect } from "react-redux";

const TopMain = props => {
  const { auth, profile } = props;
  const links = auth.uid ? (
    <SignedInLinks profile={profile} />
  ) : (
    <SignedOutLinks />
  );

  return (
    <div className="top-mobile">
      <Link to="/" className=" left">
        {
          <img
            width="65"
            src={require("../../../media/logo/square-logo.png")}
          />
        }
      </Link>

      {links}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

export default connect(mapStateToProps)(TopMain);
