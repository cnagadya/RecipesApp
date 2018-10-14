import axios from "axios";

const GET_RECIPES = "GET_RECIPES";
const DELETE_RECIPE = "DELETE_RECIPES";
const ADD_RECIPE = "ADD_RECIPE";
const GET_RECIPE = "GET_RECIPE";
const UPDATE_RECIPE = "UPDATE_RECIPE";

const initialState = {
  recipes: [],
  recipe: {}
};

export const recipesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload
      };
    case GET_RECIPE:
      return {
        ...state,
        recipe: action.payload.find(recipe => recipe)
      };
    case DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter(recipe => recipe.id !== action.payload)
      };
    case ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case UPDATE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.map(
          recipe =>
            recipe.id === action.payload.id ? (recipe = action.payload) : recipe
        )
      };
    default:
      return state;
  }
};

export const getRecipes = () => async dispatch => {
  const response = await axios.post("http://localhost:8088/_find", {});
  return dispatch({
    type: GET_RECIPES,
    payload: response.data
  });
};

export const getRecipe = id => async dispatch => {
  console.log("get rec called", id);

  const response = await axios.post("http://localhost:8088/_find", { id });
  dispatch({
    type: GET_RECIPE,
    payload: response.data
  });
};

export const deleteRecipe = id => async dispatch => {
  try {
    await axios.post("http://localhost:8088/_delete", { id });
    dispatch({
      type: DELETE_RECIPE,
      payload: id
    });
  } catch (e) {
    dispatch({
      type: DELETE_RECIPE,
      payload: id
    });
  }
};

export const postRecipe = document => async dispatch => {
  let type = ADD_RECIPE;
  if (document.id) type = UPDATE_RECIPE;
  await axios.post("http://localhost:8088/_store", document);
  dispatch({
    type: type,
    payload: document
  });
};

export const actionTypes = {
  GET_RECIPES,
  DELETE_RECIPE,
  ADD_RECIPE,
  GET_RECIPE,
  UPDATE_RECIPE
};
