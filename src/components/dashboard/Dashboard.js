import React, {Component} from 'react'
import './Dashboard.css'
import Notifications from './Notifications'
import RecipeList from '../recipes/RecipeList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import {Redirect} from 'react-router-dom';

class Dashboard extends Component {
    render (){


      console.log(this.state)
      const { recipes, auth } = this.props;

      if(!auth.uid) return <Redirect to='/signin'/>

        return(
           <div className='dashboard container'>
            <div className='dash-contents'>
            <div className=''>
            <RecipeList recipes={recipes}/>
            </div>

            <div className=''>
            <Notifications />
            </div>
            
            </div>
           </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        recipes: state.firestore.ordered.recipes,
        auth: state.firebase.auth
    }
}
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'recipes', orderBy: ['createdAt', 'desc'] }
    ])
    )
(Dashboard)