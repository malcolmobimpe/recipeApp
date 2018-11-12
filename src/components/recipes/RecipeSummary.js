import React from 'react'
import moment from 'moment'

const RecipeSummary = ({recipe}) => {

        return(
<div className='card'>
<div className='card z-depth-0'>
<div className='card-content'> 
<span className='card-title'>{recipe.title} </span>  </div>
<p>Posted by {recipe.userName}</p>
<p className='grey-text'>{ moment(recipe.createdAt.toDate()).calendar()}</p>
</div>
</div>
        )

}

export default RecipeSummary