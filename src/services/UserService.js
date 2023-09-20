import instance from "./InstanceAxios";

const fetchAllUser = (page) => {
    return instance.get(`/api/users?page=${page}`);
}



export { fetchAllUser }; 