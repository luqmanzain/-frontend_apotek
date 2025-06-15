import axios from "axios";

const apiInstance = axios.create({
  baseURL:  "https://server-apotek-production.up.railway.app/api",
});
//onst apiInstance = axios.create({
 //aseURL: "https://server-apotek-production.up.railway.app/api",
// });

export default apiInstance;