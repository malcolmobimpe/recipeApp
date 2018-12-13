const initState = {
  recipesItems: []
};

const recipeReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_RECIPE":
      return state;
    case "CREATE_RECIPE_ERROR":
      return state;
    default:
      return state;
    case "DELETE_RECIPE":
      return state;
  }
};

export default recipeReducer;
