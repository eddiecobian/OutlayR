import React from "react";
import * as blogService from "../../services/blogService";
import BlogsList from "./BlogsList";
import BlogForm from "./BlogForm";
import SweetAlert from "react-bootstrap-sweetalert";
import styles from "./Blogs.module.css";

class Blogs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogsArr: null,
      displayBlogs: null,
      initialValues: {},
      alert: null
    };
  }

  componentDidMount() {
    this.getAllBlogs();
  }

  getAllBlogs = () => {
    blogService
      .getAll()
      .then(this.onGetAllSuccess)
      .catch(this.onGetAllError);
  };

  onGetAllSuccess = data => {
    this.setState({
      blogsArr: data.items
    });
  };

  //#Start region - Get Blog By Id -- Update //
  getBlogId = id => {
    blogService
      .getById(id)
      .then(this.onGetByIdSuccess)
      .catch(this.onGetError);
  };
  onGetByIdSuccess = blog => {
    this.setValuesForForm(blog);
  };

  setValuesForForm = newValues => {
    let newState = {
      initialValues: newValues,
      id: newValues.id,
      title: newValues.title,
      description: newValues.description,
      imageUrl: newValues.imageUrl,
      name: newValues.name
    };
    this.setState(newState);
  };

  handleEditBtn = blog => {
    this.setValuesForForm(blog);
  };
  //#end region//

  handleUpdateArray = currentBlog => {
    const index = this.state.blogsArr.findIndex(
      blog => blog.id === currentBlog.id
    );
    const updateBlog = this.state.blogsArr.slice();
    updateBlog[index] = currentBlog;
    this.setState({
      blogsArr: updateBlog
    });
  };

  handleDeleteBtn = id => {
    blogService
      .deleteBlog(id)
      .then(this.onDeleteSuccess(id))
      .catch(this.onDeleteError);
  };

  closeSweetAlert = () => {
    this.setState({
      alert: false
    });
  };

  onDeleteSuccess = id => {
    const newArr = this.state.blogsArr.filter(blog => blog.id !== id);
    this.setState({
      blogsArr: newArr,
      alert: (
        <SweetAlert onConfirm={this.closeSweetAlert}>
          <h2 className="text-center">Your blog has been deleted!</h2>
        </SweetAlert>
      )
    });
  };

  handleNewArray = blog => {
    this.setState(prevState => ({
      blogsArr: [...prevState.blogsArr, blog]
    }));
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="col-lg-12 col-md-6 ">
            <div className=" el-element-overlay ">
              <div className="el-card-item">
                <div className="el-card-avatar el-overlay-1">
                  <img
                    className={`${styles.height} card-img-top`}
                    src="https://www.ecampusnews.com/files/2016/01/blogs.jpg"
                    alt="User"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <BlogForm
                handleUpdateArray={this.handleUpdateArray}
                getAllBlogs={this.getAllBlogs}
                handleNewArray={this.handleNewArray}
                initialValues={this.state.initialValues}
              />
            </div>
            <div className="col-md-6">
              <BlogsList
                blogsArr={this.state.blogsArr}
                handleDeleteBtn={this.handleDeleteBtn}
                handleEditBtn={this.handleEditBtn}
              />
            </div>
            <div className="col-xs-4">{this.state.alert}</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Blogs;
