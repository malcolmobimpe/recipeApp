import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import RecipeDetails from "./components/recipes/RecipeDetails";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import ProfilePage from "./components/profile/ProfilePage";
import "./components/auth/Sign.css";
import CreateRecipe from "./components/recipes/CreateRecipe";
import EditRecipe from "./components/recipes/EditRecipe";
import "./App.css";
import TopNav from "./components/layout/TopNav";
import TopMobile from "./components/layout/Mobile/TopMobile";
import LandingPage from "./components/landingPage/LandingPage";
import TopNavRecipe from "./components/layout/TopNavRecipe";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStroopwafel,
  faPlusCircle,
  faMinusCircle,
  faPlus,
  faMinus,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import { faUser as farUser } from "@fortawesome/free-regular-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import MediaQuery from "react-responsive";

library.add(
  faStroopwafel,
  faPlusCircle,
  faMinusCircle,
  faPlus,
  faMinus,
  farUser,
  faUser
);

class App extends Component {
  render() {
    const { recipes, auth } = this.props;

    if (auth.uid) {
      return (
        <Router>
          <div className="App">
            <div className="left-main">
              <Navbar />
            </div>

            <div className="right-main">
              <TopMobile />
              <Switch>
                <Route path="/recipes/:id" component={TopNavRecipe} />
                <Route exact path="/" component={TopNav} />
              </Switch>

              <div className="main-content">
                <Switch>
                  <Route exact path="/" component={Dashboard} />

                  <Route path="/recipes/:id" component={RecipeDetails} />

                  <Route path="/signin" component={SignIn} />
                  <Route path="/signup" component={SignUp} />
                  <Route path="/create" component={CreateRecipe} />
                  <Route path="/edit" component={EditRecipe} />
                  <Route exact path="/profile" component={ProfilePage} />
                </Switch>
              </div>
            </div>
          </div>
        </Router>
      );
    } else {
      return (
        <Router>
          <LandingPage />
        </Router>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    recipes: state.firestore.ordered.recipes,
    auth: state.firebase.auth
  };
};
export default connect(mapStateToProps)(App);
