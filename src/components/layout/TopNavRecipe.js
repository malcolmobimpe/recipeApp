import React from "react";
import { Component } from "react";
import { NavLink } from "react-router-dom";
import "./TopNav.css";
import { editRecipeList } from "../../store/actions/elementActions";
import { startFilter } from "../../store/actions/elementActions";
import { connect } from "react-redux";
import { activateEdit } from "../../store/actions/recipeActions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class TopNavRecipe extends Component {
  state = {
    filterWord: ""
  };

  handleEdit = e => {
    this.props.editRecipeList();
  };

  handleFilter = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
    this.props.startFilter(this.state);
  };

  render() {
    this.props.startFilter(this.state);

    const { recipes, auth } = this.props;

    const editRecipe = () => {
      const recipeId = window.location.href.split("recipes/")[1];
      this.props.activateEdit(recipeId);
    };

    return (
      <div className="top-nav">
        <NavLink
          to="/create"
          onClick={e => {
            editRecipe();
          }}
        >
          <div className="top-nav-button" onClick={this.handleEdit}>
            <FontAwesomeIcon icon="minus" size="1x" />
            <div className="top-nav-text">Edit Recipe</div>
          </div>
        </NavLink>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    recipes: state.firestore.ordered.recipes
  };
};
const mapDispatchToProps = dispatch => {
  return {
    editRecipeList: () => dispatch(editRecipeList()),
    startFilter: filterWord => dispatch(startFilter(filterWord)),
    activateEdit: recipeId => dispatch(activateEdit(recipeId))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopNavRecipe);
