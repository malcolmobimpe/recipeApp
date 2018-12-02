import React, { Component } from "react";
import moment from "moment";
import "./RecipeSummary.css";

import DeleteRecipe from "./DeleteRecipe";

import EditRecipe from "./EditRecipe";
import "../../App.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import GetProfilePic from "../profile/GetProfilePic";
import SocialModule from "./recipeModule/SocialModule";
import Trianglify from "trianglify";
import styled from "styled-components";
import textures from "textures";
import { Circles, Paths } from "react-svg-textures";

class RecipeSummary extends Component {
  render() {
    const { recipe, users} = this.props;
    const currentLikes = recipe.currentLikes;
    const userId = recipe.authorId;
    const dimensions = {
      height: " 75px",
      width: "75px"
    };



    return (
      <div className="recipe-container">
        <div className="recipe-info">
         
          <GetProfilePic dimensions={dimensions} userId={userId}  users={users} />

          <div className="recipe-summary">
            <Link to={"/recipes/" + recipe.id} key={recipe.id}>
              <div className="card-content">
                <span className="card-title">{recipe.title} </span>
              </div>
            </Link>

            <p className="sub-text">
              {moment(recipe.createdAt.toDate()).calendar()}
            </p>
           
          </div>
          <SocialModule recipeId={recipe.id} currentLikes={currentLikes} />
        </div>
        
    
        <div
              className={
                this.props.showDelete == false ? "hidden  " : "edit-recipe-box"
              }
            >
              <DeleteRecipe
                style={{ "margin-right": "20px" }}
                recipeId={recipe.id}
              />
              <EditRecipe recipeId={recipe.id} />
            </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  ///console.log(state)
  return {
    showDelete: state.elements.showDelete,
  };
};
export default 
  connect(
    mapStateToProps
  )
(RecipeSummary);
