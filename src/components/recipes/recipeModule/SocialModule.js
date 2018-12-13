import React from "react";
import { updatePostLikes } from "../../../store/actions/elementActions.js";
import { dislikePost } from "../../../store/actions/elementActions.js";
import "./SocialMedia.css";
import { connect } from "react-redux";
import { TiHeartOutline, TiHeart } from "react-icons/ti";
class SocialModule extends React.Component {
  render() {
    const { recipeId, currentLikes, userId, recipes } = this.props;
    const likeList = recipes[recipeId].likedBy;

    const updateLikes = (recipeId, currentLikes, userId) => {
      if (likeList.includes(userId)) {
        this.props.dislikePost(recipeId, currentLikes, userId);
      } else {
        this.props.updatePostLikes(recipeId, currentLikes, userId);
      }
    };
    return (
      <div className="like-comment">
        <div className="likes-container">
          <span onClick={() => updateLikes(recipeId, currentLikes, userId)}>
            {likeList.includes(userId) ? (
              <TiHeart className="recipe-icon" />
            ) : (
              <TiHeartOutline className="recipe-icon" />
            )}
          </span>

          <span>{currentLikes} </span>
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    recipes: state.firestore.data.recipes,
    userId: state.firebase.auth.uid
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updatePostLikes: (docId, currentLikes, userId) =>
      dispatch(updatePostLikes(docId, currentLikes, userId)),
    dislikePost: (docId, currentLikes, userId) =>
      dispatch(dislikePost(docId, currentLikes, userId))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SocialModule);
