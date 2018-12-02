import React, { Component } from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import "./ProfilePage.css";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import { getFirebase } from "react-redux-firebase";
import "@firebase/storage";
import { uploadProfileImage } from "../../store/actions/elementActions";
import "./ProfilePic.css";
import styled from 'styled-components'

class GetProfilePic extends Component {

   
  render() {
    const profilePic = this.props.profile.profileUrl;
    console.log(profilePic);
    console.log(this.props)
    const {dimensions }= this.props
    console.log(dimensions)


    const ProfileDisplay = styled.div`
      background: url('${profilePic ? profilePic: 'https://image.flaticon.com/icons/svg/747/747545.svg' }');
      display: inline-block;
      width: ${dimensions ? dimensions.width :'100px' };;
      height: ${dimensions ? dimensions.height :'100px' };
      border-radius: 50%;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
      `


return(    
    <ProfileDisplay />
)
    
  }
}



const mapStateToProps = state => {
  console.log(state);
  return {
    recipes: state.firestore.ordered.recipes,
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    uploadProfileImage: (profile, props) =>
      dispatch(uploadProfileImage(profile, props))
  };
};

export default compose(
  firebaseConnect(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(GetProfilePic);
