import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Row, Button, Alert } from "antd";

import { getRecipes } from "../../store/recipes";
import Recipe from "./Recipe";
import "./Recipes.scss";

import logo from "../../assets/logo.jpg";
class Recipes extends Component {
  componentDidMount() {
    this.props.getRecipes();
  }
  render() {
    const { recipes } = this.props;
    return (
      <Fragment>
        <div className="logo-area">
          Recipe
          <img src={logo} alt="Recipe App Logo" className="logo" /> Haven
        </div>

        {recipes.length ? (
          <Row>
            {recipes.map(recipe => (
              <Recipe key={recipe.id} recipe={recipe} />
            ))}
          </Row>
        ) : (
          <Alert
            message="No recipes added yet"
            description={<Button>Add a Recipe</Button>}
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
