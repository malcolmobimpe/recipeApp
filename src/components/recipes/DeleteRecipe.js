import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteRecipe } from "../../store/actions/recipeActions";
import "./RecipeSummary.css";

class DeleteRecipe extends Component {
  render() {
    const removeRecipe = () => {
      const targetRecipe = this.props.recipeId;
      this.props.deleteRecipe(targetRecipe);
    };
    return (
      <div
        className="grey-button"
        onClick={e =>
          window.confirm("Are you sure you want to delete this recipe") &&
          removeRecipe()
        }
      >
        Delete
      </div>
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
    deleteRecipe: targetRecipe => dispatch(deleteRecipe(targetRecipe))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteRecipe);
