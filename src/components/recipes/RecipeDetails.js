import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import {Redirect} from 'react-router-dom'
import moment from 'moment'

const RecipeDetails = (props) => {
const { recipe, auth } = props;

if(!auth.uid) return <Redirect to='/signin'/>


if (recipe){
  return (
    <div className='container section project-details'>
    <div className='card'>
    <div className='card-content'>
    <span className='card-title'> {recipe.title}</span>
    <p>{recipe.content}</p>
    </div>
    <div className='card-action grey'>
    <div>Posted by {recipe.userName}</div>
    <div>{ moment(recipe.createdAt.toDate()).calendar()}</div>
    
    </div>
    </div>
      </div>
  )
   
} else {
  return (
    <div>
       <p>Cooking up your recipe</p>
    </div>
  )
 
}

  }

  const mapStateToProps = (state, ownProps) => {
    //console.log(state)
    const id = ownProps.match.params.id;
    const recipes = state.firestore.data.recipes;
    const recipe = recipes ? recipes[id] : null;
    return {
        recipe:recipe,
        auth:state.firebase.auth


    }
  }
export default compose( 
  connect(mapStateToProps),
  firestoreConnect([
    {collection: 'recipes'}
  ])
) (RecipeDetails)
