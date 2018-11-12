import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createRecipe } from '../../store/actions/recipeActions'
import {Redirect} from 'react-router-dom'
class CreateRecipe extends Component {

    state={
title:'',
content:'',
    }

    handleChange = (e) => {
       this.setState ({
           [e.target.id]: e.target.value
       })
    }

    handleSubmit = (e) => {
        e.preventDefault();
       //console.log(this.state)
    this.props.createRecipe(this.state)
    this.props.history.push('/')
      }

  render() {
    const { auth } = this.props;
    if(!auth.uid) return <Redirect to='/signin'/>

    return (
      <div className='container'>
        <form  onSubmit={this.handleSubmit} className='white'>
        <h5 className='grey-text text-darken-3'> Add A New Recipe</h5>
        <div className='input-field'>
            <label htmlFor='title'>Name</label>
      <input type='text' id='title' onChange={this.handleChange}/>
        </div>
        <div className='input-field'>
            <label htmlFor='content'>Recipe Content</label>
      <textarea className='materialize-textarea'  id='content' onChange={this.handleChange}/>
        </div>
<div className='input-field'>
<button className='btn blue lighten-3'>Create</button>


</div>
        </form>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    auth:state.firebase.auth
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    createRecipe: (recipe) => dispatch(createRecipe(recipe))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRecipe)