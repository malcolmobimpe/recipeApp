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

class TopNav extends Component {
 
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


 handleActiveEdit = e => {
   this.props.cancleEdit()
  };
  render() {
    this.props.startFilter(this.state);

    const { recipes, auth } = this.props;

    return (
      <div className="top-nav">
        <div className="top-nav-column">
          <NavLink to="/create" onClick={this.handleActiveEdit()}>
            <div className="top-nav-button">
              <FontAwesomeIcon icon="plus" size="1x" />
              <div className="top-nav-text">Add Recipe</div>
            </div>
          </NavLink>
        </div>

        <div className="top-search">
          <label className="top-nav-text">Search Recipes</label>
          <input id="filterWord" type="text" onKeyUp={this.handleFilter} />
        </div>



        <NavLink to="">
          <div className="top-nav-button" onClick={this.handleEdit}>
            <FontAwesomeIcon icon="minus" size="1x" />
            <div className="top-nav-text">Edit Recipe List</div>
          </div>
        </NavLink>



      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    recipes: state.firestore.ordered.recipes
    //  activeEdit : state.elements.showDelete
  };
};
const mapDispatchToProps = dispatch => {
  return {
    editRecipeList: () => dispatch(editRecipeList()),
    startFilter: filterWord => dispatch(startFilter(filterWord)),
    cancleEdit: ()=> dispatch(cancleEdit())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopNav);
