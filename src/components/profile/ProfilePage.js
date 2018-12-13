import React, { Component } from "react";
import PropTypes from "prop-types";
import "./ProfilePage.css";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import "@firebase/storage";
import { uploadProfileImage } from "../../store/actions/elementActions";
import GetProfilePic from "./GetProfilePic";

class ProfilePage extends Component {
  constructor(state) {
    super(state);
    this.state = {
      profileImage: null,
      profileUrl: null,
      showEdit: false
    };
  }

  static propTypes = {
    firebase: PropTypes.object
  };

  selectFile = e => {
    let reader = new FileReader();
    const profilePic = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        profileImage: profilePic,
        profileUrl: reader.result
      });
    };

    reader.readAsDataURL(profilePic);
  };

  uploadImage = () => {
    const metadata = {
      customMetadata: {
        user: this.props.auth.uid
      }
    };
    const {
      firebase: { storage }
    } = this.props;

    const props = this.props;
    const profile = this.state.profileImage;
    this.props.uploadProfileImage(profile, props);
    this.setState({
      showEdit: false
    });
  };

  showEdit = () => {
    this.setState({
      showEdit: !this.state.showEdit
    });
  };
  render() {
    const { auth, recipes, users } = this.props;

    return (
      <div className="profile-page">
        <div className="profile-info">
          <GetProfilePic proPic />

          <div
            className="upload-photo-container"
            style={{ "flex-direction": "column" }}
            className={this.state.showEdit ? "" : "hidden"}
          >
            <input
              type="file"
              style={{ width: "50%", "font-size": ".9em" }}
              onChange={this.selectFile}
            />
            <button className="white-button" onClick={() => this.uploadImage()}>
              Upload
            </button>
          </div>

          <div
            onClick={() => this.showEdit()}
            className={this.state.showEdit ? "hidden " : "white-button"}
          >
            Change Photo
          </div>

          <div>
            <span>username: </span>
            {users[auth.uid].userName}
          </div>
          <div>
            <span>email: </span>
            {auth.email}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    recipes: state.firestore.ordered.recipes,
    auth: state.firebase.auth,
    users: state.firestore.data.users
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
)(ProfilePage);
