import React from "react";
import { Component } from "react";
import "./TopNav.css";
import { connect } from "react-redux";
import "./MyFeed.css";
import { ShowMyFeed } from "../../store/actions/elementActions";
import { ShowMyRecipe } from "../../store/actions/elementActions";

class MyFeed extends Component {
  showRecipe = () => {
    this.props.ShowMyRecipe();
  };

  showFeed = () => {
    this.props.ShowMyFeed();
  };

  render() {
    const { feedState } = this.props;

    return (
      <div className="recipe-feed">
        <div
          className={feedState ? "" : "feed-border"}
          onClick={() => this.showRecipe()}
        >
          My Recipes
        </div>

        <div
          className={feedState ? "feed-border" : ""}
          onClick={() => this.showFeed()}
        >
          My Feed
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    recipes: state.firestore.ordered.recipes,
    feedState: state.elements.showFeed
  };
};
const mapDispatchToProps = dispatch => {
  return {
    ShowMyRecipe: () => dispatch(ShowMyRecipe()),
    ShowMyFeed: () => dispatch(ShowMyFeed())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyFeed);
