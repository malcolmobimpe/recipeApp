import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { activateEdit } from "../../store/actions/recipeActions";

import "./RecipeSummary.css";

class EditRecipe extends Component {
  render() {
    const editRecipe = () => {
      this.props.activateEdit(this.props.recipeId);
    };

    return (
      <NavLink
        to="/create"
        className="white-button"
        onClick={e => {
          editRecipe();        }}
      >
        Edit
      </NavLink>
    );
  }
}

const mapStateToProps = state => {
  return {
    recipes: state.firestore.ordered.recipes,
    auth: state.firebase.auth
  };
};
const mapDispatchToProps = dispatch => {
  return {
    activateEdit: recipeId => dispatch(activateEdit(recipeId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditRecipe);
