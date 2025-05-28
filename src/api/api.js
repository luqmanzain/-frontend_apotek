import axios from "axios";

// const apiInstance = axios.create({
//   baseURL: "http://localhost:3001/api",
// });
const apiInstance = axios.create({
  baseURL: "https://server-apotek-production.up.railway.app/api",
});

export default apiInstance;