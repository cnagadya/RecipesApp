import React from "react";
import { mount } from "enzyme";
import { Form } from "antd";

import RecipeForm from "./Form";
import Provider from "../../store/provider";
import { sampleRecipies, testFunction } from "../../assets/testData";

let component;
beforeEach(() => {
  const initialState = {
    stateObj: {
      recipes: sampleRecipies,
      recipe: {}
    }
  };
  component = mount(
    <Provider initialState={initialState}>
      <RecipeForm closeDrawer={testFunction} />
    </Provider>
  );
});

afterEach(() => {
  component.unmount();
});

it("has two form items", () => {
  expect(component.find(Form.Item).length).toEqual(2);
});

it("has an input for recipe title that users can type in", () => {
  component
    .find('[name="title"]')
    .first()
    .simulate("change", {
      target: { name: "title", value: "Sample Recipe Title" }
    });
  component.update();
  expect(
    component
      .find('[name="title"]')
      .first()
      .prop("value")
  ).toEqual("Sample Recipe Title");
});

it("has an input for recipe content that users can type in", () => {
  component
    .find('[name="content"]')
    .first()
    .simulate("change", {
      target: { name: "content", value: "Sample Recipe Content" }
    });
  component.update();
  expect(
    component
      .find('[name="content"]')
      .first()
      .prop("value")
  ).toEqual("Sample Recipe Content");
});
