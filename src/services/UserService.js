import { instance } from "./InstanceAxios";

const fetchAllUser = (page) => {
  return instance.get(`/api/users?page=${page}`);
};

const postCreateUser = (name, job) => {
  return instance.post("/api/users", { name, job });
};

const putEditUser = (id, name, job) => {
  return instance.put(`/api/users/${id}`, { name, job });
};

const deletetUser = (id) => {
  return instance.delete(`/api/users/${id}`);
};
export { fetchAllUser, postCreateUser, putEditUser, deletetUser };
