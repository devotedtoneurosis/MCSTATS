import axios from "axios";

export default axios.create({
  baseURL: "http://75.127.4.251:8080/",
  headers: {
    "Content-type": "application/json"
  }
});