import axios from "axios";
import { API_KEY } from "../constants";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: API_KEY,
    language: "en-US",
  },
});

export default instance;
