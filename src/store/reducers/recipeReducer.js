const initState={
    recipesItems:[
        {id: '1', title: 'peach pie', content: '2tbs of love'},
        {id: '2', title: 'apple pie', content: '26lbs of lovin'},
        {id: '3', title: 'peach aple pie', content: '4tbs of love'},
        {id: '4', title: 'new one peach aple pie', content: '4tbs of love'}

    ]

}

const recipeReducer = (state = initState, action) => {
    switch(action.type) {
        case 'CREATE_RECIPE':
        console.log(action.recipe);
        return state;
        case 'CREATE_RECIPE_ERROR':
            console.log('create error', action.err)
            return state;
            default:
            return state;
    }


}

export default recipeReducer