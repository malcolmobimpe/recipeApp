
//get collection, recipes from firebase
export const getRecipe = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    getFirestore().collection("recipes");
  };
};

//create a new recipe
export const createRecipe = (recipe, docId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    if (docId) {
      // if there is an item to edit // this is for updating recipe content
      getFirestore()
        .collection("recipes")
        .doc(docId)
        .update({
          ...recipe //pass in new reciped info from state
        });
    } else {
      const profile = getState().firebase.profile;
      const authorId = getState().firebase.auth.uid;
      getFirestore()
        .collection("recipes")
        .add({
          ...recipe,
          currentLikes: 0,
          likedBy: [],
          authorId: authorId,
          createdAt: new Date()
        })
        .then(() => {
          dispatch({ type: "CREATE_RECIPE", recipe });
        })
        .catch(err => {
          dispatch({ type: "CREATE_RECIPE_ERROR", err });
        });
    }
  };
};

export const deleteRecipe = targetRecipe => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    getFirestore()
      .collection("recipes")
      .doc(targetRecipe)
      .delete()
      .then(() => {
        dispatch({ type: "DELETE_RECIPE" });
      })
      .catch(err => {
        dispatch({ type: "DELETE_RECIPE_ERROR", err });
      });
  };
};
//activates edit for recipe update
export const activateEdit = recipeId => {
  return {
    type: "BEGIN_RECIPE_EDIT",
    payload: recipeId
  };
};
