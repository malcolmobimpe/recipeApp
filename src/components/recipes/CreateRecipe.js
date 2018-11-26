import React, { Component } from "react";
import { connect } from "react-redux";
import { createRecipe } from "../../store/actions/recipeActions";
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { timingSafeEqual } from "crypto";
import "./CreateRecipe.css";

class CreateRecipe extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    title: "",
    content: "",
    savedIngredients: []
  };

  componentDidMount() {
 if (this.props.elements.beginEdit == true ){
 const editTitleId = this.props.editId;
const editTitle =  this.props.recipes[editTitleId].title
const editContent =  this.props.recipes[editTitleId].content
const ingredients = this.props.recipes[editTitleId].savedIngredients
this.setState({
  title: editTitle  ,
  content:  editContent,
  savedIngredients: ingredients,
})

 } 
  
  }
   
    
    
 
  addIngredient = index => { 
    const ingredientList = this.state.savedIngredients;

    const newIngredients = [
      {
        name: this.state.ingredientName,
        amount: this.state.ingredientAmount,
        id: this.state.savedIngredients.length
      }
    ];
   
    this.setState({
      savedIngredients: ingredientList.concat(newIngredients),
      ingredientAmount:'',
      ingredientName:''
    });
  };

  removeIngredient = index => {
    const items = this.state.savedIngredients;
    items.splice(index, 1);
    this.setState({
      savedIngredients: items
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    //console.log(this.state)
     if (this.props.elements.beginEdit == true ){
      this.props.createRecipe(this.state, this.props.editId );

     }else {
      this.props.createRecipe(this.state)
     }
    this.props.history.push("/");
  };

  render() {
    const {auth, elements} = this.props;
    
    const directionsArea = {
      height: "100%"
    };

   


  


    if (!auth.uid) return <Redirect to="/signin" />;

    

    return (
      <div className="create-recipe-page">
        <div className="recipe-form">
          <div className="ingredient-directions">
            <div className="recipe-name ">
              <label className="recipe-label" htmlFor="title">
                Recipe Name
              </label>
              <input
                className="formName"
                type="text"
                id="title"
                onChange={this.handleChange}
                value={this.state.title}

              />
            </div>

            <div className="input-field directions">
              <label className="recipe-label" htmlFor="content">
                Recipe Directions/Notes
              </label>

              <textarea
                className="materialize-textarea directions-area"
                style={directionsArea}
                placeholder=""
                id="content"
                onChange={this.handleChange}
                value={this.state.content}
              />
            </div>

            <div className="ingredients">
              <div
                className="ingredient-change-btn"
                onClick={this.addIngredient.bind(this)}
              >
                <div>
                  <FontAwesomeIcon icon="plus" size="1x" />
                </div>
                Add Ingredient
              </div>
              <div className="ingredient-container">
                <div className="ingredient-name">
                  <label htmlFor="ingredientName">Ingredient Name</label>
                  <input
                    onChange={this.handleChange}
                    className="ingredient-input"
                    id={"ingredientName"}
                    value={this.state.ingredientName}
                  />
                </div>
                <div className="ingredient-amount">
                  <label htmlFor="ingredientAmount">Ingredient Amount</label>
                  <input
                    onChange={this.handleChange}
                    className="ingredient-input"
                    id={"ingredientAmount"}
                    value={this.state.ingredientAmount}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="ingredient-amount">
            <label className="ingredient-label"> Ingredients:</label>
            {this.state.savedIngredients.map((ingredient, index) => (
              <div className="recipe-item-container" key={index}>
                <div>{index + 1}.</div>
                <div className="recipe-ingredients">
                  <div className="ingredient-item">
                    <div className="ingredient-label">
                      <span>name : </span> {ingredient.name}
                    </div>

                    <div className="ingredient-label">
                      <span>amount : </span> {ingredient.amount}
                    </div>
                  </div>

                  <div
                    onClick={() => this.removeIngredient(index)}
                    className="ingredient-change-btn"
                  >
                    <FontAwesomeIcon icon="minus" size="1x" />
                    remove
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="input-field">
          <span className="create-recipe-btn" onClick={this.handleSubmit}>
            Create Recipe
          </span>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log(state)
  return {
    auth: state.firebase.auth,
    elements: state.elements,
    recipes: state.firestore.data.recipes,
    editId: state.elements.editId
   
  };
};
const mapDispatchToProps = dispatch => {
  return {
    createRecipe:( recipe, docId )=> dispatch(createRecipe(recipe, docId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateRecipe);
