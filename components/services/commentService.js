import axios from "axios";
import * as helpers from "./serviceHelpers";

const createComment = payload => {
  const config = {
    method: "POST",
    url: helpers.API_HOST_PREFIX + "/api/comments",
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
    url: helpers.API_HOST_PREFIX + "/api/comments",
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
    url: helpers.API_HOST_PREFIX + `/api/comments/${id}`,
    //data: { id: id },
    data: id,
    crossdomian: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

const getByEntityId = (entityId, entityTypeId)=>{
  const config = {

    method:"GET",
    url:helpers.API_HOST_PREFIX + `/api/comments/entity?entityId=${entityId}&entityTypeId=${entityTypeId}`,
    crossdomain:true,
    headers: { "Content-Type": "application/json" }

  };
  return axios(config)
  .then(helpers.onGlobalSuccess)
  .catch(helpers.onGlobalError)

}

const updateComment = (data, id) => {
  const config = {
    method: "PUT",
    url: helpers.API_HOST_PREFIX + `/api/comments/${id}`,
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

const deleteComment = id => {
  const config = {
    method: "DELETE",
    url: helpers.API_HOST_PREFIX + `/api/comments/${id}`,
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

export { getAll, getById,getByEntityId, createComment, updateComment, deleteComment };
