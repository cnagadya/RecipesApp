import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { Button, Form, Input } from "antd";

import { postRecipe, deleteRecipe } from "../../store/recipes";

class RecipeForm extends Component {
  initialState = {
    content: "",
    title: ""
  };

  state = {
    newRecipe: this.initialState
  };
  componentDidMount() {
    this.getSelectedRecipe();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.recipe !== this.props.recipe) {
      this.getSelectedRecipe();
    }
  }

  getSelectedRecipe = () => {
    if (Object.keys(this.props.recipe).length) {
      this.setState({ newRecipe: this.props.recipe });
    }
  };
  onChange = event => {
    const { name, value } = event.target;
    const newRecipe = {
      ...this.state.newRecipe,
      [name]: value
    };
    this.setState({ newRecipe });
  };
  addRecipe = event => {
    event.preventDefault();
    const { content, title } = this.state.newRecipe;
    if (content === "" || title === "") {
      alert("Title and Content are both required");
      return;
    }
    this.props
      .postRecipe(JSON.parse(JSON.stringify(this.state.newRecipe)))
      .then(() => {
        this.props.history.push("/recipes");
        this.setState({ newRecipe: this.initialState });
      });
  };

  onDeleteClick = () => {
    const { deleteRecipe, closeDrawer } = this.props;
    deleteRecipe(this.state.newRecipe.id).then(() => closeDrawer());
  };
  updateRecipe = () => {
    const { id } = this.state.newRecipe;
    const { recipes, closeDrawer, postRecipe } = this.props;
    const selectedRecipe = recipes.find(recipe => recipe.id === id);
    this.setState({ newRecipe: selectedRecipe });
    const updatedRecipe = { ...this.state.newRecipe, id: id };
    postRecipe(JSON.parse(JSON.stringify(updatedRecipe))).then(() =>
      closeDrawer()
    );
  };
  render() {
    const { newRecipe } = this.state;
    const FormItem = Form.Item;
    return (
      <Form onSubmit={this.addRecipe}>
        <FormItem label="Title">
          <Input
            name="title"
            value={newRecipe.title}
            onChange={this.onChange}
          />
        </FormItem>
        <FormItem label="Content">
          <Input.TextArea
            rows={10}
            name="content"
            value={newRecipe.content}
            onChange={this.onChange}
          />
        </FormItem>
        <div className="form-buttons">
          {Object.keys(this.props.recipe).length ? (
            <Fragment>
              <Button onClick={this.updateRecipe}>Update Recipe</Button>
              <Button type="danger" onClick={this.onDeleteClick}>
                Delete Recipe
              </Button>
            </Fragment>
          ) : (
            <Button type="primary" htmlType="submit">
              Add Recipe
            </Button>
          )}
        </div>
      </Form>
    );
  }
}
RecipeForm.propTypes = {
  recipes: PropTypes.array.isRequired,
  recipe: PropTypes.object.isRequired,
  postRecipe: PropTypes.func.isRequired,
  deleteRecipe: PropTypes.func.isRequired,
  closeDrawer: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  recipes: state.stateObj.recipes,
  recipe: state.stateObj.recipe
});

const mapDispatchToprops = dispatch =>
  bindActionCreators({ postRecipe, deleteRecipe }, dispatch);
const ConnectedRecipeForm = connect(
  mapStateToProps,
  mapDispatchToprops
)(RecipeForm);

export {ConnectedRecipeForm}

export default withRouter(ConnectedRecipeForm);
