import React from "react";
import { mount } from "enzyme";
import Recipes from "./Recipes";
import Recipe from "./Recipe";
import Provider from "../../store/provider";
import { sampleRecipies } from "../../assets/testData";

let component;
beforeEach(() => {
  const initialState = {
    stateObj: {
      recipes: sampleRecipies
    }
  };
  component = mount(
    <Provider initialState={initialState}>
      <Recipes />
    </Provider>
  );
});

afterEach(() => {
  component.unmount();
});

it("displays a recipe card for each recipe", () => {
  expect(component.find(Recipe).length).toEqual(2);
});
