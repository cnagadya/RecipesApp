import React, { Component } from "react";
import { Menu, Icon, Drawer } from "antd";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  NavLink
} from "react-router-dom";
import classNames from "classnames";

import AddRecipe from "./recipes/AddRecipe";
import Form from "./form/Form";
import NotFound from "./notFound/NotFound";
import Recipes from "./recipes/Recipes";

import "./App.scss";
class App extends Component {
  state = {
    collapsedMenu: false,
    drawerOpen: false
  };

  toggleMenu = () => {
    this.setState(prevState => ({
      collapsedMenu: !prevState.collapsedMenu
    }));
  };

  showDrawer = () => {
    this.setState({
      drawerOpen: true
    });
  };

  closeDrawer = () => {
    this.setState({
      drawerOpen: false
    });
  };

  render() {
    const Item = Menu.Item;
    const { collapsedMenu, drawerOpen } = this.state;
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
        <Drawer
          title="Manage Recipe"
          placement="right"
          width={400}
          onClose={this.closeDrawer}
          visible={drawerOpen}
        >
          <Form closeDrawer={this.closeDrawer}/>
        </Drawer>
        <div className="content-area">
          <Router>
            <Switch>
              <Redirect exact from="/" to="/recipes" />
              <Route
                path="/recipes"
                render={() => (
                  <Recipes
                    showDrawer={this.showDrawer}
                    closeDrawer={this.closeDrawer}
                  />
                )}
              />
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
