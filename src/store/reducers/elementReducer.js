const initState = {
  showDelete: false,
  beginEdit: false,
  editId: "",
  showFeed: true,
  sortBy: "",
  filterList: ""
};

const elementReducer = (state = initState, action) => {
  switch (action.type) {
    case "EDIT_RECIPE_LIST":
      return {
        ...state,
        showDelete: !state.showDelete
      };
    case "BEGIN_FILTER":
      const filterList = action.payload;
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
        beginEdit: false
      };
    case "UPLOAD_PPROFILE_IMAGE":
      return {
        ...state
      };

    case "PROFILE_IMAGE_URL":
      const url = action.payload;
      return {
        ...state,
        profileUrl: url
      };

    case "SHOW_MY_RECIPES":
      return {
        ...state,
        showFeed: false
      };
    case "SHOW_MY_FEED":
      return {
        ...state,
        showFeed: true
      };
    case "SORT_BY":
      const sortTerm = action.payload;
      return {
        ...state,
        sortBy: sortTerm
      };

    default:
      return state;
  }
};

export default elementReducer;
