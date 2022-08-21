import axios from "axios";

const api = axios.create({
  //Link da API
  baseURL: "http://viacep.com.br/ws/",
});

export default api;
