import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom'
import { deleteRecipe } from '../../store/actions/recipeActions'
import { ReactComponent } from "react";
import './RecipeSummary.css'

class DeleteRecipe extends Component {
    render(){
  const removeRecipe =  ()  => {
       const targetRecipe =  this.props.recipeId;
   this.props.deleteRecipe(targetRecipe);
      //  console.log(recipeId)
        // console.log(recipe)  
   // console.log(targetRecipe)

     }
        return (
     
       <div className='recipe-btn' onClick={ e =>  
           (window.confirm('Are you sure you want to delete this recipe'  ))
            && removeRecipe()  
        } >Delete</div>      
                  )
    
    }
  
};

const mapStateToProps = (state) => {
    // console.log(state)
      return {
          recipes: state.firestore.ordered.recipes,
          auth: state.firebase.auth
      }
  }

  const mapDispatchToProps = (dispatch) =>{
      return {
        deleteRecipe: (targetRecipe) => dispatch(deleteRecipe(targetRecipe))
      }
  }
export default connect(mapStateToProps,mapDispatchToProps )(DeleteRecipe);
