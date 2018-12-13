import authReducer from "./authReducer";
import recipeReducer from "./recipeReducer";
import elementReducer from "./elementReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
const rootReducer = combineReducers({
  auth: authReducer,
  recipe: recipeReducer,
  elements: elementReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;
