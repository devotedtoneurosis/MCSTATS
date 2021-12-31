import http from "../http-common";

class PagesDataService {
  getAll() {
    return http.get("/pages");
  }

  get(id) {
    return http.get(`/pages/${id}`);
  }

  create(data) {
    return http.post("/pages", data);
  }

  update(id, data) {
    return http.put(`/pages/${id}`, data);
  }

  delete(id) {
    return http.delete(`/pages/${id}`);
  }

  deleteAll() {
    return http.delete(`/pages`);
  }

  findByTitle(title) {
    return http.get(`/pages?title=${title}`);
  }
}

export default new PagesDataService();