import React from "react";
import { Form, Formik, Field } from "formik";
import * as Schema from "./blogSchema";
import * as blogService from "../../services/blogService";
import PropTypes from "prop-types";
import SweetAlert from "react-bootstrap-sweetalert";

class BlogForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postedId: "",
      initialValues: this.props.initialValues,
      successAlert: null
    };
    this.state.validationSchema = Schema.validationSchema;
    this.state.initialValues = Schema.initialValues;
  }

  componentDidUpdate(prevProps) {
    if (this.props.initialValues !== prevProps.initialValues) {
      this.setState({
        initialValues: this.props.initialValues
      });
    }
  }

  currentBlog = {};

  onSubmit = (values, { setSubmitting }) => {
    this.state.initialValues.id
      ? blogService
          .updateBlog(this.state.initialValues.id, values)
          .then(this.onUpdateSuccess)
          .catch(this.onUpdateError)
      : blogService
          .create(values)
          .then(this.onPostSuccess)
          .catch(this.onPostError);

    setTimeout(() => setSubmitting(false, 3 * 1000));
  };

  onPostSuccess = data => {
    this.setState({
      postedId: data.item,
      initialValues: "",
      successAlert: (
        <SweetAlert
          success
          confirmBtnBsStyle="primary"
          onConfirm={this.closeSweetAlert}
        >
          <h2 className="text-center">Post Successful!</h2>
        </SweetAlert>
      )
    });
    this.getBlogId();
  };

  closeSweetAlert = () => {
    this.setState({
      successAlert: false
    });
  };

  onPostError = () => {};

  getBlogId = () => {
    blogService
      .getById(this.state.postedId)
      .then(this.onGetByIdSuccess)
      .catch(this.onGetError);
    this.props.getAllBlogs();
  };

  onGetByIdSuccess = blog => {
    this.props.handleNewArray(blog);
  };

  handleUpdate = values => {
    this.currentBlog = values;
    blogService
      .updateBlog(values, values.id)
      .then(this.onUpdateSuccess)
      .catch(this.onUpdateError);
  };

  onUpdateSuccess = () => {
    this.props.handleUpdateArray(this.currentBlog);
    this.setState({
      initialValues: ""
    });
  };

  render() {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="text-left">Add A Blog</h5>
          <div className="row">
            <div className="col-md-12">
              <Formik
                validationSchema={this.state.validationSchema}
                initialValues={this.state.initialValues}
                onSubmit={this.onSubmit}
                enableReinitialize={true}
                render={({ values, touched, errors, dirty, isSubmitting }) => (
                  <Form className="form-material m-t-40 text-left">
                    <div className="form-group text-left">
                      <Field
                        type="text"
                        name="title"
                        className="form-control"
                        placeholder="Enter Title"
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
                        placeholder="Enter Description"
                        value={values.description || ""}
                      />
                      {errors.description && touched.description ? (
                        <div style={{ color: "red" }}>
                          {errors.description}{" "}
                        </div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <Field
                        className="form-control"
                        name="imageUrl"
                        type="text"
                        placeholder="Enter Image Url"
                        value={values.imageUrl || ""}
                      />
                      {errors.imageUrl && touched.imageUrl ? (
                        <div style={{ color: "red" }}>{errors.imageUrl} </div>
                      ) : null}
                    </div>

                    <div className="form-group">
                      <Field
                        className="form-control"
                        name="name"
                        type="text"
                        placeholder="Enter Name"
                        value={values.name || ""}
                      />
                      {errors.name && touched.name ? (
                        <div style={{ color: "red" }}>{errors.name} </div>
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
            {this.state.successAlert}
          </div>
        </div>
      </div>
    );
  }
}
BlogForm.propTypes = {
  handleUpdateArray: PropTypes.func,
  handleNewArray: PropTypes.func,
  getAllBlogs: PropTypes.func,
  initialValues: PropTypes.object
};
export default BlogForm;
