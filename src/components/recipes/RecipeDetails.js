import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import moment from "moment";
import "./RecipeDetail.css";

const RecipeDetails = props => {
  const { recipe, auth } = props;

  if (!auth.uid) return <Redirect to="/signin" />;

  if (recipe) {
    return (
      <div className="recipe-page">
        <div className="recipe-row">
          <div className="title-container">
            <h2 className="recipe-title"> {recipe.title}</h2>
            <div className="recipe-content">
              {recipe.content}
              <div className="recipe-date">
                {moment(recipe.createdAt.toDate()).calendar()}
              </div>
            </div>
          </div>

          <div className="ingredient-container">
            <h2 className="recipe-title">Ingredients</h2>
            <div className="recipe-ingredients">
              {recipe &&
                recipe.savedIngredients.map((ingredients, index) => {
                  return (
                    <div className="ingredient-list">
                      <div key={index}>
                        {ingredients.name}: <span>&nbsp;&nbsp;</span>{" "}
                      </div>
                      <div key={index}> {ingredients.amount}</div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        <div className="" />
      </div>
    );
  } else {
    return (
      <div>
        <p>Cooking up your recipe</p>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const recipes = state.firestore.data.recipes;
  const recipe = recipes ? recipes[id] : null;
  return {
    recipe: recipe,
    auth: state.firebase.auth
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "recipes" }])
)(RecipeDetails);
