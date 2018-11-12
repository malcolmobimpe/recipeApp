import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import Dashboard from './components/dashboard/Dashboard'
import RecipeDetails from "./components/recipes/RecipeDetails";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import CreateRecipe from "./components/recipes/CreateRecipe"

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/' component={Dashboard}/>
            <Route path='/recipes/:id' component={RecipeDetails} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/create' component={CreateRecipe} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
