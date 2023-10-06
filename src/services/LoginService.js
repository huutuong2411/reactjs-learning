import axios from "axios";

const LoginAPI = (email, password) => {
  return axios.post(
    "https://api.escuelajs.co/api/v1/auth/login",
    JSON.stringify({ email, password }),
    { headers: { "Content-Type": "application/json" } }
  );
};
export { LoginAPI };
