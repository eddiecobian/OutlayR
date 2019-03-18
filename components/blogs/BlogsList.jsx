import React from "react";
import "../../assets/scss/style.css";
import PropTypes from "prop-types";

class BlogsList extends React.Component {
  convertDateCreated = longDate => {
    let date = new Date(longDate);
    return (
      date.getUTCMonth() +
      1 +
      "/" +
      date.getUTCDate() +
      "/" +
      date.getFullYear()
    );
  };

  mapBlogs = () => {
    const blogsList = this.props.blogsArr.map((blog, key) => (
      <div key={key}>
        <div className="card">
          <img
            className="card-img-top img-responsive"
            src={blog.imageUrl}
            alt=""
          />
          <div className="card-body">
            <h1 className="card-title">{blog.title}</h1>
            <p className="card-text">{blog.description}</p>
            <p className="card-text">
              <small className="text-muted">
                Last posted: {this.convertDateCreated(blog.dateCreated)}
              </small>
            </p>
            <p className="label label-info">
              Written by: <b>{blog.name}</b>
            </p>
            <div className="row pull-right">
              <div className="col-xs-2">
                <button
                  onClick={() => this.props.handleEditBtn(blog)}
                  className="btn btn-success pull-right mr-2"
                >
                  Edit
                </button>
              </div>
              <div className="col-xs-2">
                <button
                  onClick={() => this.props.handleDeleteBtn(blog.id)}
                  className="pull-right btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
    return blogsList;
  };

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-lg-12 ">
            {this.props.blogsArr ? (
              this.mapBlogs()
            ) : (
              <h3 className="text-center mt-3">
                <i>Be The First To Add A Blog</i>
              </h3>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
BlogsList.propTypes = {
  blogsArr: PropTypes.array,
  handleDeleteBtn: PropTypes.func,
  handleEditBtn: PropTypes.func
};
export default BlogsList;
