import React from "react";
import * as commentService from "../../services/commentService";
import CommentsForm from "./CommentsForm";
import CommentsList from "./CommentsList";
import PropTypes from "prop-types";

class Comments extends React.Component {
  constructor() {
    super();
    this.state = {
      commentsArr: [],
      initialValues: {}
    };
  }

  componentDidMount() {
    //this.getAllComments();
  }

  componentDidUpdate(prevProp) {
    if (prevProp.commentsArr !== this.props.commentsArr) {
      this.setState({
        commentsArr: this.props.commentsArr
      });
    }
  }

  getAllComments = () => {
    commentService
      .getAll()
      .then(this.onGetAllCommentsSuccess)
      .catch(this.onGetAllError);
  };

  onGetAllCommentsSuccess = data => {
    this.setState({
      commentsArr: data.items
    });
  };

  handleUpdateArray = currentComment => {
    const index = this.props.commentsArr.findIndex(
      comment => comment.id === currentComment.id
    );
    const updateComment = this.props.commentsArr.slice();
    updateComment[index] = currentComment;

    // this.setState({
    //   commentsArr: updateComment
    // });
    this.props.updateArr(updateComment);
  };

  handleNewArray = () => {
    // this.setState(prevState => ({
    //   commentsArr: [...prevState.commentsArr, comment]
    // }));
    this.props.getComments(this.props.entityId);
  };

  getCommentPostedId = id => {
    commentService
      .getById(id)
      .then(this.onGetByIdSuccess)
      .catch(this.onGetError);
  };

  handleEditBtn = comment => {
    this.setValuesForForm(comment);
  };

  onGetByIdSuccess = data => {
    this.setValuesForForm(data);
  };

  setValuesForForm = newValues => {
    let newState = {
      initialValues: newValues,
      id: newValues.id,
      title: newValues.title,
      description: newValues.description,
      parentId: newValues.parentId
    };
    this.setState(newState);
  };

  handleDeleteBtn = id => {
    commentService
      .deleteComment(id)
      .then(this.onDeleteSuccess(id))
      .catch(this.onDeleteError);
  };

  onDeleteSuccess = id => {
    const newArr = this.props.commentsArr.filter(comment => comment.id !== id);
    // this.setState({
    //   commentsArr: newArr
    // });
    this.props.updateArr(newArr);
  };

  render() {
    return (
      <div className="row">
        <div className="col-6">
          <CommentsForm
            handleUpdateArray={this.handleUpdateArray}
            getAllComments={this.getAllComments}
            handleNewArray={this.handleNewArray}
            initialValues={this.state.initialValues}
            entityId={this.props.entityId}
            entityTypeId={this.props.entityTypeId}
          />
        </div>
        <div className="col-6">
          <CommentsList
            commentsArr={this.props.commentsArr}
            handleDeleteBtn={this.handleDeleteBtn}
            handleEditBtn={this.handleEditBtn}
          />
        </div>
      </div>
    );
  }
}
Comments.propTypes = {
  commentsArr: PropTypes.array,
  updateArr: PropTypes.array,
  entityId: PropTypes.number,
  entityTypeId: PropTypes.number,
  getComments: PropTypes.func
};

export default Comments;
