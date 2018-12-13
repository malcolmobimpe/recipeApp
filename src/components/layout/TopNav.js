import React from "react";
import { Component } from "react";
import { NavLink } from "react-router-dom";
import "./TopNav.css";
import { editRecipeList } from "../../store/actions/elementActions";
import { startFilter } from "../../store/actions/elementActions";
import { cancleEdit } from "../../store/actions/elementActions";
import { sendSortBy } from "../../store/actions/elementActions";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MyFeed from "./MyFeed";

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
    this.props.startFilter(this.state.filterWord);
  };

  handleActiveEdit = e => {
    this.props.cancleEdit();
  };

  handleSort = e => {
    this.props.sendSortBy(e.target.value);
    console.log(e.target.value);
  };

  render() {
    this.props.startFilter(this.state);

    const { recipes, auth } = this.props;

    return (
      <div className="top-nav-container">
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
            <input
              style={{ "text-align": "center" }}
              placeholder="Search Recipes"
              id="filterWord"
              type="text"
              onKeyUp={this.handleFilter}
            />
          </div>

          <NavLink to="">
            <div className="top-nav-button" onClick={this.handleEdit}>
              <FontAwesomeIcon icon="minus" size="1x" />
              <div className="top-nav-text">Edit Recipe List</div>
            </div>
          </NavLink>
        </div>

        <MyFeed />
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
    cancleEdit: () => dispatch(cancleEdit()),
    sendSortBy: () => dispatch(sendSortBy())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopNav);
