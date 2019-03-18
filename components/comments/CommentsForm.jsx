import React from "react";
import { Form, Formik, Field } from "formik";
import * as Schema from "./commentSchema";
import * as commentService from "../../services/commentService";
import PropTypes from "prop-types";

class CommentsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialValues: {
        id: "",
        title: "",
        description: "",
        entityId: this.props.entityId,
        entityTypeId: this.props.entityTypeId,
        parentId: 0
      },
      postedId: ""
    };

    this.state.validationSchema = Schema.validationSchema;

    // this.state.initialValues = {
    //   id: "",
    //   title: "",
    //   description: "",
    //   entityId: this.props.entityId,
    //   entityTypeId: this.props.entityTypeId,
    //   parentId: 0
    // };
  }

  currentComment = {};

  componentDidUpdate(prevProps) {
    if (this.props.initialValues !== prevProps.initialValues) {
      this.setState({ initialValues: this.props.initialValues });
    }
  }

  onSubmit = (values, { setSubmitting }) => {
    this.state.initialValues.id
      ? commentService
          .updateComment(this.state.initialValues.id, values)
          .then(this.onUpdateSuccess)
          .catch(this.onUpdateError)
      : //this.setState(
        //     prevState => ({
        //       initialValues: {
        //         ...prevState.initialValues,
        //         entityId: this.props.entityId
        //       }
        //     }),
        this.post(values);
    // );

    setTimeout(() => setSubmitting(false, 3 * 1000));
  };

  post = values => {
    commentService
      .createComment(values)
      .then(this.onPostSuccess)
      .catch(this.onPostError);
  };

  onPostSuccess = data => {
    this.setState(
      //prevState => (
      {
        postedId: data.item,
        initialValues: ""
        // {
        //   ...prevState.initialValues,
        //   description: "",
        //   title: "",
        //   parentId: 0,
        //   //entityId: this.props.entityId,
        //   //entityTypeId: this.props.entityTypeId,
        //   id: ""
        // }
      },
      () => this.setValues()
    );
    //);

    this.getCommentPostedId();
  };

  setValues = () => {
    this.setState({
      initialValues: {
        description: "",
        title: "",
        parentId: 0,
        entityId: this.props.entityId,
        entityTypeId: this.props.entityTypeId,
        id: ""
      }
    });
  };

  onPostError = () => {};

  getCommentPostedId = () => {
    commentService
      .getById(this.state.postedId)
      .then(this.onGetByIdSuccess)
      .catch(this.onGetError);
    this.props.getAllComments();
  };

  onGetByIdSuccess = comment => {
    this.props.handleNewArray(comment);
  };

  onGetError = () => {};

  handleUpdate = values => {
    this.currentComment = values;
    commentService
      .updateComment(values, values.id)
      .then(this.onUpdateSuccess)
      .catch(this.onUpdateError);
  };

  onUpdateSuccess = () => {
    this.props.handleUpdateArray(this.currentComment);
    this.setState({
      initialValues: " "
    });
  };

  onUpdateError = () => {};

  render() {
    return (
      <div className="">
        <div className="card">
          <div className="card-body">
            <h5 className="text-left">Add a comment</h5>
            <div className="card-body">
              <div className="row">
                <div className="col-sm-12 col-xs-12">
                  <Formik
                    validationSchema={this.state.validationSchema}
                    initialValues={this.state.initialValues}
                    onSubmit={this.onSubmit}
                    enableReinitialize={true}
                    render={({
                      values,
                      touched,
                      errors,
                      dirty,
                      isSubmitting
                    }) => (
                      <Form className="form-material m-t-40 text-left">
                        <div className="form-group text-left">
                          <Field
                            type="text"
                            name="title"
                            className="form-control"
                            placeholder="Title"
                            value={values.title || ""}
                          />
                          {errors.title && touched.title ? (
                            <div style={{ color: "red" }}>{errors.title} </div>
                          ) : null}
                        </div>
                        <div className="form-group">
                          <Field
                            className="form-control"
                            component="textarea"
                            rows="5"
                            name="description"
                            type="text"
                            placeholder="Add a comment..."
                            value={values.description || ""}
                          />
                          {errors.description && touched.description ? (
                            <div style={{ color: "red" }}>
                              {errors.description}{" "}
                            </div>
                          ) : null}
                        </div>

                        {this.state.initialValues.id ? (
                          <button
                            type="button"
                            className="btn btn-warning"
                            disabled={isSubmitting || !dirty}
                            onClick={() => this.handleUpdate(values)}
                          >
                            Update
                          </button>
                        ) : (
                          <button
                            type="submit"
                            className="btn btn-info m-r-10"
                            disabled={isSubmitting || !dirty}
                          >
                            Post
                          </button>
                        )}
                      </Form>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CommentsForm.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  handleUpdateArray: PropTypes.func,
  handleNewArray: PropTypes.func,
  getAllComments: PropTypes.func,
  initialValues: PropTypes.object,
  editComment: PropTypes.object,
  entityId: PropTypes.number,
  entityTypeId: PropTypes.number
};

export default CommentsForm;
