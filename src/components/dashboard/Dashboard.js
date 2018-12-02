import React, { Component } from "react";
import "./Dashboard.css";
import RecipeList from "../recipes/RecipeList";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { getRecipe } from "../../store/actions/recipeActions";
import { Redirect } from "react-router-dom";

class Dashboard extends Component {

  constructor(state){
    super(state)
      this.state = {
        ready: false
      }
    
  }
  componentDidMount(){
this.setState({
  ready: true
})
  }
  render() {

    if (this.state.ready ){
        //this.props.getRecipe();

    const { recipes, auth,users } = this.props;
    //const recipeList = recipes.filter(x => x.author.id == this.props.uid)

    if (!auth.uid) return <Redirect to="/signin" />;

    return (
      <div className="dashboard">
        <div className="dash-contents">
          <RecipeList recipes={recipes} users={users} />
        </div>
      </div>
    );
    } else {
      return  <div>loading...</div>
    }
  
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    uid: state.firebase.auth.uid,
    recipes: state.firestore.ordered.recipes,
    auth: state.firebase.auth,
  users: state.firestore.data.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRecipe: () => dispatch(getRecipe())
  };
};
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([  { collection: "users" },
    { collection: "recipes", orderBy: ["createdAt", "desc"] }
  
  ])
)(Dashboard);

/*firestoreConnect([
    // Load todos from Firestore which are not done into redux
    { collection: 'todos', where: ['done', '==', false] }
  ]),*/
