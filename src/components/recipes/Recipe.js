import React, { Component } from "react";
import { Col, Icon } from "antd";
import PropTypes from "prop-types";

class Recipe extends Component {
  render() {
    const { title, content, created_at } = this.props.recipe;
    return (
      <Col
        offset={2}
        xs={{ span: 5 }}
        lg={{ span: 6 }}
        className="single-recipe"
      >
        <h3>
          {title} <Icon type="delete" theme="outlined" />
        </h3>
        <div className="recipe-content"> {content}</div>
      </Col>
    );
  }
}

Recipe.propTypes = {
  recipe: PropTypes.object.isRequired
};

export default Recipe;
