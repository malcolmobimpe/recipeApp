import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { activateEdit } from "../../store/actions/recipeActions";
import { ReactComponent } from "react";
import { Redirect } from "react-router-dom";

import "./RecipeSummary.css";

class EditRecipe extends Component {
  render() {
    const editRecipe = () => {
      this.props.activateEdit(this.props.recipeId);

    //  console.log(this.props.recipeId);
    };

    return (
      <NavLink to= '/create'
        className="recipe-btn"
        onClick={e => {
          editRecipe();
          //<Redirect to='/create'/>
        }}
      >
        Edit
      </NavLink>
    );
  }
}

const mapStateToProps = state => {
//  console.log(state);
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
