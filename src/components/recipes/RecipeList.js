import React, {Component} from 'react'
import RecipeSummary from "./RecipeSummary";
import "./Recipe.css";
import DeleteRecipe from "./DeleteRecipe";
import { filterRecipeList } from "../../store/actions/elementActions";
import { connect } from "react-redux";
import {NavLink} from 'react-router-dom'


class RecipeList extends Component {
render(){

   const { recipes } = this.props
   const term = this.props.filter.filterList.filterWord


    return (
      <div className="recipe-list">
        {recipes &&
          recipes.filter(filterRecipeList(term)).map(recipe => {
            return (
              <div>
                  <RecipeSummary recipe={recipe} />
              </div>
            );
          })}
      </div>
    );


};



}

 
const mapStateToProps = state => {
  return {
    filter: state.elements,
    
  };
};

export default connect(mapStateToProps)(RecipeList);
