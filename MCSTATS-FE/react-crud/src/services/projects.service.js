import http from "../http-common";

class ProjectsDataService {
  getAll() {
    return http.get("/api/projects");
  }

  get(id) {
    return http.get(`/api/projects/${id}`);
  }

  create(data) {
    return http.post("/api/projects", data);
  }

  update(id, data) {
    return http.put(`/api/projects/${id}`, data);
  }

  delete(id) {
    return http.delete(`/api/projects/${id}`);
  }

  deleteAll() {
    return http.delete(`/api/projects`);
  }

  findByTitle(title) {
    return http.get(`/api/projects?title=${title}`);
  }
}

export default new ProjectsDataService();