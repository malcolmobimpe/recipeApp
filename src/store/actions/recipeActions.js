export const getRecipe = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    getFirestore().collection("recipes");
  };
};

export const createRecipe = (recipe, docId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // console.log(recipe)
    if (docId) {
      // if there is an item to edit
      getFirestore()
        .collection("recipes")
        .doc(docId)
        .update({
          ...recipe //pass in new reciped info from state
        });
    } else {
      const profile = getState().firebase.profile;
      const authorId = getState().firebase.auth.uid;
      //const userName = getState().firebase.profile.userName;
      getFirestore()
        .collection("recipes")
        .add({
          ...recipe,
          //userName: userName,

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

export const activateEdit = recipeId => {
  return {
    type: "BEGIN_RECIPE_EDIT",
    payload: recipeId
  };
};
