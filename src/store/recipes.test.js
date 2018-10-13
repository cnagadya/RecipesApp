import { actionTypes, recipesReducer } from "./recipes";
import { sampleRecipies, sampleId } from "../assets/testData";

it("Handles actions of type ADD_RECIPE", () => {
  const action = {
    type: actionTypes.ADD_RECIPE,
    payload: {
      content: "Sample Recipe Title",
      title: "Sample Recipe"
    }
  };
  const newState = recipesReducer({ recipes: [] }, action);
  expect(newState).toEqual({
    recipes: [{ content: "Sample Recipe Title", title: "Sample Recipe" }]
  });
});

it("Handles actions of type UPDATE_RECIPE", () => {
  const action = {
    type: actionTypes.UPDATE_RECIPE,
    payload: {
      content: "I really like mangoes",
      title: "mangoes",
      id: "60bd3b10-169b-45cc-833a-5f0fd60fbc75"
    }
  };
  const newState = recipesReducer({ recipes: sampleRecipies }, action);
  expect(newState).toEqual({
    recipes: [
      {
        content: "I really like mangoes",
        id: "60bd3b10-169b-45cc-833a-5f0fd60fbc75",
        title: "mangoes"
      },
      {
        content: "I really like bananas",
        created_at: "2018-10-10T15:20:41.076",
        id: "e322b482-eabc-457e-ace6-750e9dfc42f4",
        title: "bananas"
      }
    ]
  });
});

it("Handles actions of type GET_RECIPE", () => {
  const action = {
    type: actionTypes.GET_RECIPE,
    payload: {
      id: sampleId
    }
  };
  const newState = recipesReducer({ recipes: sampleRecipies }, action);
  expect(newState).toEqual({
    recipe: {
      content: "I really like bananas",
      title: "bananas",
      id: "e322b482-eabc-457e-ace6-750e9dfc42f4",
      created_at: "2018-10-10T15:20:41.076"
    }
  });
});

it("Handles actions of type DELETE_RECIPE", () => {
  const action = {
    type: actionTypes.DELETE_RECIPE,
    payload: sampleId
  };

  const newState = recipesReducer({ recipes: sampleRecipies }, action);
  expect(newState).toEqual({
    recipes: [
      {
        content: "I really like apples",
        title: "apples",
        id: "60bd3b10-169b-45cc-833a-5f0fd60fbc75",
        created_at: "2018-10-10T15:20:34.899"
      }
    ]
  });
});

it("does not modify state when an invalid action type is passed", () => {
  const newState = recipesReducer({}, { type: "random action type" });
  expect(newState).toEqual({});
});

