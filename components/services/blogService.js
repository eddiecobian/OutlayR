import axios from "axios";
import * as helpers from "./serviceHelpers";

const create = payload => {
  const config = {
    method: "POST",
    url: helpers.API_HOST_PREFIX + "/api/blogs",
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

const getAll = () => {
  const config = {
    method: "GET",
    url: helpers.API_HOST_PREFIX + "/api/blogs",
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

const getById = id => {
  //debugger;
  const config = {
    method: "GET",
    url: helpers.API_HOST_PREFIX + `/api/blogs/${id}`,
    //data: { id: id },
    data: id,
    crossdomian: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

const updateBlog = (data, id) => {
  const config = {
    method: "PUT",
    url: helpers.API_HOST_PREFIX + `/api/blogs/${id}`,
    data: data,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(helpers.onGlobalSuccess)
    .then(() => {
      return data;
    })
    .catch(helpers.onGlobalError);
};

const deleteBlog = id => {
  const config = {
    method: "DELETE",
    url: helpers.API_HOST_PREFIX + `/api/blogs/${id}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return (
    axios(config)
      .then(helpers.onGlobalSuccess)
      // .then(() => id)
      .catch(helpers.onGlobalError)
  );
};

export { getAll, getById, create, updateBlog, deleteBlog };