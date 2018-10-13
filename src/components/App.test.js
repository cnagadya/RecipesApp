import React from "react";
import { shallow } from "enzyme";
import { Menu } from "antd";
import App from "./App";

let component;
beforeEach(() => {
  component = shallow(<App />);
});

it("contains the menu", () => {
  expect(component.find(Menu).length).toEqual(1);
});

it("has a content area", () => {
  expect(component.find(".content-area").length).toEqual(1);
});
