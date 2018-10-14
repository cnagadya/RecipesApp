import React, { Component } from "react";
import { connect } from "react-redux";
import { Col } from "antd";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

import { getRecipe } from "../../store/recipes";
class Recipe extends Component {
  showRecipeDetails = id => {
    this.props.getRecipe(id).then(() => this.props.showDrawer());
  };

  render() {
    const { title, content, id } = this.props.recipe;
    return (
      <Col
        offset={2}
        xs={{ span: 5 }}
        lg={{ span: 6 }}
        className="single-recipe"
        onClick={this.showRecipeDetails.bind(this, id)}
      >
        <h3>
          {title}
         
        </h3>
        <div className="recipe-content"> {content}</div>
      </Col>
    );
  }
}

Recipe.propTypes = {
  recipe: PropTypes.object.isRequired,
  getRecipe: PropTypes.func
};

const mapDispatchToprops = dispatch =>
  bindActionCreators({ getRecipe }, dispatch);

export default connect(
  null,
  mapDispatchToprops
)(Recipe);
