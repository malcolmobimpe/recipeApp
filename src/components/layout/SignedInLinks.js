import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";
import GetProfilePic from "../profile/GetProfilePic";
const SignedInLinks = props => {
  const picture = props.profile;
  const dimensions = {
    width: "50px",
    height: "50px"
  };

  return (
    <div className="nav-links">
      <NavLink to="/profile" className=" ">
        <GetProfilePic dimensions={dimensions} proPic />
        {props.profile.userName}{" "}
      </NavLink>

      <a
        style={{ color: "#cdcdcd", "magin-top": "10%" }}
        onClick={props.signOut}
      >
        {" "}
        Logout
      </a>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    profile: state.firebase.profile
  };
};
const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignedInLinks);
