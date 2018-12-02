export const editRecipeList = () => {
  return {
    type: "EDIT_RECIPE_LIST"
  };
};

export const cancleEdit = () => {
  return {
    type: "CANCLE_RECIPE_EDIT"
  };
};

export const startFilter = filterWord => {
  return {
    type: "BEGIN_FILTER",
    payload: filterWord
  };
};

export const filterRecipeList = (term, feedState, userId) => {
  return (x, dispatch) => {
    if (feedState) {
      return x.title.toLowerCase().includes(term.toLowerCase());
    } else {
      return (
        x.title.toLowerCase().includes(term.toLowerCase()) &&
        x.authorId == userId
      );
    }
  };
};

export const sortRecipeList = sortBy => {
  return function(a, b) {
    return a.sortBy - b.sortBy;
  };
};

export const sendSortBy = sortTerm => {
  console.log(sortTerm);
  return {
    type: "SORT_BY",
    payload: sortTerm
  };
};

export const uploadProfileImage = (profile, elemProps) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const user = elemProps.auth.uid;
    const storageRef = elemProps.firebase.storage().ref();
    const fileRef = storageRef.child(`/propic/` + profile.name);
    let uploadTask = fileRef.put(profile);
    uploadTask.on(
      "state_changed",
      function(snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      function(error) {},
      function() {
        uploadTask.snapshot.ref
          .getDownloadURL()
          .then(function(downloadURL) {
            console.log("File available at", downloadURL);
          })
          .then(() => {
            dispatch({ type: "UPLOAD_PROFILE_IMAGE" });
          })
          .catch(err => {
            dispatch({ type: "UPLOAD_PROFILE_IMAGE_ERROR", err });
          })
          .then(() => {
            const url = fileRef.getDownloadURL().then(function(downloadURL) {
              getFirestore()
                .collection("users")
                .doc(user)
                .update({
                  profileUrl: downloadURL
                });
            });
          });
      }
    );
  };
};

export const getUsers = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    getFirestore().collection("users");
  };
};

//Modules

//Social Module

export const updatePostLikes = (docId, currentLikes, userId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    console.log("LIKE");
    const likedItems = getState().firestore.data.recipes[docId].likedBy;
    const checkLikes = () =>
      likedItems.includes(userId) ? likedItems : likedItems.concat([userId]);

    const checkLikeCount = () =>
      likedItems.includes(userId) ? currentLikes : currentLikes + 1;
    const likedList = checkLikes();
    const likeCount = checkLikeCount();
    getFirestore()
      .collection("recipes")
      .doc(docId)
      .update({ currentLikes: likeCount, likedBy: likedList })
      .then(() => {
        dispatch({ type: "INCREASE_LIKES" });
      })
      .catch(err => {
        dispatch({ type: "INCREASE_LIKES_ERROR", err });
      });
  };
};

export const dislikePost = (docId, currentLikes, userId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    console.log("DISLIKE");
    const likedItems = getState().firestore.data.recipes[docId].likedBy;
    const index = likedItems.indexOf(userId);
    const checkLikes = () => likedItems.splice(index, 1);
    console.log(index);
    console.log(checkLikes());
    const checkLikeCount = currentLikes - 1;
    const likedList = checkLikes();
    const likeCount = checkLikeCount;
    getFirestore()
      .collection("recipes")
      .doc(docId)
      .update({ currentLikes: likeCount, likedBy: likedList })
      .then(() => {
        dispatch({ type: "DECREASE_LIKES" });
      })
      .catch(err => {
        dispatch({ type: "DECREASE_LIKES_ERROR", err });
      });
  };
};

//Feed Switch
export const ShowMyRecipe = () => {
  return {
    type: "SHOW_MY_RECIPES"
  };
};

export const ShowMyFeed = () => {
  return {
    type: "SHOW_MY_FEED"
  };
};
