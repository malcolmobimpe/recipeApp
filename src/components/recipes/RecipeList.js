import React, {Component} from 'react'
import RecipeSummary from "./RecipeSummary";
import "./Recipe.css";
import DeleteRecipe from "./DeleteRecipe";
import { filterRecipeList } from "../../store/actions/elementActions";
import { sortRecipeList } from "../../store/actions/elementActions"
import { connect } from "react-redux";
import {NavLink} from 'react-router-dom'


class RecipeList extends Component {
render(){

   const { recipes , feedState, userId, sortBy , users} = this.props
   const term = this.props.filter.filterList.filterWord


    return (
      <div className="recipe-list">
        {recipes &&
          recipes.filter(filterRecipeList(term, feedState, userId)).sort(sortRecipeList(sortBy)).map(recipe => {
            return (
           
                  <RecipeSummary recipe={recipe} users={users} />
              
            );
          })}
      </div>
    );


};



}

 
const mapStateToProps = state => {
  return {
    filter: state.elements,
    feedState: state.elements.showFeed,
    sortBy: state.elements.sortBy,
    userId : state.firebase.auth.uid
    
  };
};

export default connect(mapStateToProps)(RecipeList);
