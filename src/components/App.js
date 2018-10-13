import React, { Component, Fragment } from "react";
import { Menu, Icon } from "antd";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  NavLink
} from "react-router-dom";
import classNames from "classnames";

import AddRecipe from "./recipes/AddRecipe";
import NotFound from "./notFound/NotFound";
import Recipes from "./recipes/Recipes";

import "./App.scss";
class App extends Component {
  state = {
    collapsedMenu: false
  };

  toggleMenu = () => {
    this.setState(prevState => ({
      collapsedMenu: !prevState.collapsedMenu
    }));
  };

  render() {
    const Item = Menu.Item;
    const { collapsedMenu } = this.state;
    return (
      <div
        className={classNames("main-container", {
          "reduce-width": collapsedMenu
        })}
      >
        <div className="side-menu">
          <div onClick={this.toggleMenu} className="menu-toggle">
            <Icon type={collapsedMenu ? "menu-unfold" : "menu-fold"} />
          </div>

          <Router>
            <Menu mode="inline" theme="dark" inlineCollapsed={collapsedMenu}>
              <Item key="home">
                <NavLink to="/recipes">
                  <Icon type="home" theme="outlined" />
                  <span>Home</span>
                </NavLink>
              </Item>
              <Item key="add">
                <NavLink to="/recipes/add">
                  <Icon type="file-add" theme="outlined" />
                  <span>Add Recipe</span>
                </NavLink>
              </Item>
            </Menu>
          </Router>
        </div>
        <div className="content-area">
          <Router>
            <Switch>
              <Redirect exact from="/" to="/recipes" />
              <Route path="/recipes" component={Recipes} />
              <Route exact path="/recipes/add" component={AddRecipe} />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
