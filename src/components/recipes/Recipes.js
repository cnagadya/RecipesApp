import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Row, Button, Alert, Spin } from "antd";
import classNames from "classnames";

import { getRecipes } from "../../store/recipes";
import Recipe from "./Recipe";
import "./Recipes.scss";
import logo from "../../assets/logo.jpg";
class Recipes extends Component {
  state = { loading: true };
  componentDidMount() {
    this.props.getRecipes().then(this.setState({ loading: false }));
  }
  render() {
    const { recipes, showDrawer } = this.props;
    return (
      <Fragment>
        <div
          className={classNames("spinner", {
            hidden: !this.state.loading
          })}
        >
          <Spin />
        </div>

        {recipes.length ? (
          <Row
            className={classNames("", {
              hidden: this.state.loading
            })}
          >
            {recipes.map(recipe => (
              <Recipe key={recipe.id} recipe={recipe} showDrawer={showDrawer} />
            ))}
          </Row>
        ) : (
          <Alert
            message="No recipes added yet"
            description={<Button onClick={showDrawer}>Add a Recipe</Button>}
            type="info"
            className="no-recipes"
          />
        )}
      </Fragment>
    );
  }
}
Recipes.propTypes = {
  recipes: PropTypes.array.isRequired,
  getRecipes: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  recipes: state.stateObj.recipes
});
export default connect(
  mapStateToProps,
  { getRecipes }
)(Recipes);
