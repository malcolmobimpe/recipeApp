import React, { Component } from "react";
import moment from "moment";
import "./RecipeSummary.css";

import DeleteRecipe from "./DeleteRecipe";

import EditRecipe from "./EditRecipe";
import '../../App.css'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";




class RecipeSummary extends Component {
  render() {
    const { recipe } = this.props;
    return (
      <div className="recipe-summary">
                        <Link to={"/recipes/" + recipe.id} key={recipe.id}>

        <div className="card-content">
          <span className="card-title">{recipe.title} </span>{" "}
        </div>
        </Link>        <p className="sub-text">
          {moment(recipe.createdAt.toDate()).calendar()}
        </p>
        <div className={this.props.showDelete == false ? "hidden  " : "edit-recipe-box"} >
          <DeleteRecipe recipeId={recipe.id} />
          <EditRecipe recipeId={recipe.id}/>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
   return {
      showDelete: state.elements.showDelete,
      
   }
 }
 export default connect(mapStateToProps)(RecipeSummary);

