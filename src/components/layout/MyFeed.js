import React from "react";
import ReactDOM from "react-dom";
import { Component} from 'react'
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./TopNav.css";
import { editRecipeList } from "../../store/actions/elementActions";
import { startFilter } from "../../store/actions/elementActions";
import { cancleEdit } from "../../store/actions/elementActions";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './MyFeed.css'
import { ShowMyFeed} from "../../store/actions/elementActions";
import { ShowMyRecipe } from "../../store/actions/elementActions";


class MyFeed extends Component {


    showRecipe= () => {
        this.props.ShowMyRecipe()
    

    }

    showFeed= () => {
        this.props.ShowMyFeed()
       

    }
 
  render() {
const {feedState} =this.props

    return(

        <div className= 'recipe-feed'>
        <div  className={ feedState ? '' : 'feed-border'}
        onClick={()=> this.showRecipe()}>
    My Recipes 
        </div>

        <div className={ feedState ? 'feed-border' :'' } onClick={()=> this.showFeed()}>
    My Feed
    
        </div>
        </div>
    )

  }
}

const mapStateToProps = state => {
    console.log(state)
  return {
    recipes: state.firestore.ordered.recipes,
    feedState: state.elements.showFeed,
  };
};
const mapDispatchToProps = dispatch => {
  return {
   ShowMyRecipe: () => dispatch( ShowMyRecipe()),
ShowMyFeed: () => dispatch(ShowMyFeed()),

  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyFeed);
