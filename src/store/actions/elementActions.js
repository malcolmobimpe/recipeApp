export const editRecipeList = () => {
    return {
          type: 'EDIT_RECIPE_LIST' 
    };

};


export const cancleEdit=()=> {
      return{
        type: 'CANCLE_RECIPE_EDIT',
      
    }
    }
    

  export const startFilter = (filterWord) => {
     return{
           type: 'BEGIN_FILTER',
           payload: filterWord
     }
    }

  export const filterRecipeList =(term)=>{
      return(x, dispatch) => {
            return (x.title.toLowerCase().includes(term.toLowerCase()) || !term)
           
      }
  }
