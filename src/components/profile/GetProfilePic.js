import React, { Component } from "react";
import "./ProfilePage.css";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { uploadProfileImage } from "../../store/actions/elementActions";
import { getUsers } from "../../store/actions/elementActions";
import "./ProfilePic.css";
import styled from "styled-components";
import { NavLink } from "react-router-dom";


class GetProfilePic extends Component {


  
  render() {
    const { proPic, userId, profile, users } = this.props;

 
  const profilePic = () => {
      if (proPic) {
        if (profile.profileUrl) {
          return profile.profileUrl;
        } else {
          return "https://image.flaticon.com/icons/svg/747/747545.svg";
        }
      } else if (userId) {
  
        const userMatch = ()=>  users[userId].profileUrl ?  users[userId].profileUrl : false;

        if (userMatch()) {
          return userMatch();
        } else {
          return "https://image.flaticon.com/icons/svg/747/747545.svg";
        }
      }
    };

    const { dimensions } = this.props;

    const ProfileDisplay = styled.div`
      background: url('${profilePic()}');
      display: inline-block;
      width: ${dimensions ? dimensions.width : "100px"};;
      height: ${dimensions ? dimensions.height : "100px"};
      border-radius: 50%;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
      `;


      const DisplayContainer = styled.div`
      display: flex;
      flex-direction:column;
      align-items:center;
      justify-content:center;
      `
    return (<DisplayContainer>

  <ProfileDisplay />
   
    </DisplayContainer>
  

    
    );
  }
}

const mapStateToProps = state => {

  return {
    recipes: state.firestore.ordered.recipes,
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    
  };
};

const mapDispatchToProps = dispatch => {
  return {
    uploadProfileImage: (profile, props) =>
      dispatch(uploadProfileImage(profile, props)),
    getUsers: () => dispatch(getUsers())
  };
};

export default 
  
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
(GetProfilePic);
