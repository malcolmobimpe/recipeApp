export const createRecipe = (recipe) => {
return(dispatch, getState, {getFirebase, getFirestore}) => { 

const firestore = getFirestore();
const profile = getState().firebase.profile;
const authorId = getState().firebase.auth.uid;
const userName = getState().firebase.profile.userName;

firestore.collection('recipes').add({
    ...recipe, 
    userName: userName,
    authorId: userName,
    createdAt: new Date()
}).then(()=> {
    dispatch({type:'CREATE_RECIPE', recipe})
}).catch( (err)=>{
    dispatch({ type: 'CREATE_RECIPE_ERROR', err})
})
     
    }
}