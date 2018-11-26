import React, {Component} from 'react'
import './Dashboard.css'
import RecipeList from '../recipes/RecipeList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { getRecipe } from "../../store/actions/recipeActions";

import {Redirect} from 'react-router-dom';

class Dashboard extends Component {
    
    render (){
        this.props.getRecipe();



     
      const { recipes, auth } = this.props;
  //const recipeList = recipes.filter(x => x.author.id == this.props.uid)

      if(!auth.uid) return <Redirect to='/signin'/>

        return(
           <div className='dashboard'>
            <div className='dash-contents'>
           
            <RecipeList recipes={recipes}/>
       
            </div>
           </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        uid: state.firebase.auth.uid,
        recipes: state.firestore.ordered.recipes,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = dispatch => {
    return{
    getRecipe: () => dispatch(getRecipe())
    }
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
   firestoreConnect([  { collection: 'recipes', orderBy: ['createdAt', 'desc'] }])
   )
(Dashboard)