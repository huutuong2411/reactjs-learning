import axios from "axios";
const instance = axios.create({
  baseURL: "https://reqres.in",
  // timeout: 1000,
  // headers: { 'X-Custom-Header': 'foobar' }
});

//player
const instancePlayers = axios.create({
  baseURL: "https://www.thesportsdb.com",
});

export { instance, instancePlayers };
