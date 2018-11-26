


 const initState = {
  showDelete: false,
  beginEdit: false,
 editId: '',
 };
    
  
  
  const elementReducer = (state = initState, action) => {
    switch (action.type) {
      case "EDIT_RECIPE_LIST":
        return {
          ...state,
          showDelete: !state.showDelete,
           
        };
        case "BEGIN_FILTER":
        const  filterList = action.payload;
        return {
          ...state,
          filterList
        };
        case "BEGIN_RECIPE_EDIT":
        const targetRecipe = action.payload;
        return {
        
          ...state,
          beginEdit: true,
          editId: targetRecipe

        };
        case "CANCLE_RECIPE_EDIT":
        return {
        
          ...state,
          beginEdit: false,

        };
        
      
      default:
        return state;
    }
  };

  
  
  export default elementReducer;